import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { OptionUniverseService } from './option-universe.service';
import { StrikeFilterService } from './strike-filter.service';
import { OptionCacheService } from './option-cache.service';
import { ConfigService } from '../config/config.service';
import { ScannerGateway } from './scanner.gateway';

interface ExplosionAlert {
  symbol: string;
  strike: number;
  optionType: string;
  ltp: number;
  priceChange: number;
  volumeSpike: number;
  oiChange: number;
  ivChange: number;
  score: number;
  signalTag: string;
  timestamp: number;
}

@Injectable()
export class ExplosionDetectorService implements OnModuleInit {
  private readonly logger = new Logger(ExplosionDetectorService.name);
  private scannerInterval: NodeJS.Timeout | null = null;
  private alerts: ExplosionAlert[] = [];

  constructor(
    private optionUniverseService: OptionUniverseService,
    private strikeFilterService: StrikeFilterService,
    private optionCacheService: OptionCacheService,
    private configService: ConfigService,
    private scannerGateway: ScannerGateway,
  ) {}

  async onModuleInit() {
    // Start scanner after 10 seconds (allow time for initialization)
    setTimeout(() => {
      this.startScanner();
    }, 10000);
  }

  startScanner() {
    this.logger.log('🚨 Starting Option Explosion Scanner...');

    this.scannerInterval = setInterval(async () => {
      await this.scan();
    }, this.configService.scannerInterval);
  }

  stopScanner() {
    if (this.scannerInterval) {
      clearInterval(this.scannerInterval);
      this.scannerInterval = null;
    }
  }

  private async scan() {
    try {
      const universe = this.optionUniverseService.getUniverse();

      // Scan each option contract
      for (const option of universe) {
        // Simulate market data update (in real app, this comes from WebSocket)
        this.simulateMarketData(option.token);

        // Check for explosion
        const alert = this.detectExplosion(option);
        if (alert) {
          this.alerts.unshift(alert);
          this.alerts = this.alerts.slice(0, 100); // Keep last 100 alerts

          // Broadcast to frontend
          this.scannerGateway.broadcastAlert(alert);

          this.logger.log(
            `💥 EXPLOSION DETECTED: ${alert.symbol} ${alert.strike}${alert.optionType} | Score: ${alert.score} | Tag: ${alert.signalTag}`,
          );
        }
      }
    } catch (error) {
      this.logger.error(`Scanner error: ${error.message}`);
    }
  }

  private detectExplosion(option: any): ExplosionAlert | null {
    const priceChange = this.optionCacheService.getPriceChange(option.token);
    const volumeSpike = this.optionCacheService.getVolumeSpike(option.token);
    const oiChange = this.optionCacheService.getOIChange(option.token);
    const ivChange = this.optionCacheService.getIVChange(option.token);

    // Calculate score
    let score = 0;

    if (Math.abs(priceChange) >= this.configService.explosionPriceChange) {
      score += 3;
    }

    if (volumeSpike >= this.configService.explosionVolumeSpike) {
      score += 2;
    }

    if (Math.abs(oiChange) >= this.configService.explosionOiChange) {
      score += 2;
    }

    if (Math.abs(ivChange) >= this.configService.explosionIvChange) {
      score += 2;
    }

    // Check if meets threshold
    if (score < this.configService.explosionScoreThreshold) {
      return null;
    }

    // Determine signal tag
    let signalTag = 'OPTION BLAST';

    if (volumeSpike > 10 && Math.abs(priceChange) < 10) {
      signalTag = 'SMART MONEY ENTRY';
    } else if (Math.abs(priceChange) > 60) {
      signalTag = 'FAST MOMENTUM';
    }

    const history = this.optionCacheService.getHistory(option.token);
    const ltp = history.ltp.length > 0 ? history.ltp[history.ltp.length - 1] : 0;

    return {
      symbol: option.name,
      strike: option.strike,
      optionType: option.optionType,
      ltp,
      priceChange,
      volumeSpike,
      oiChange,
      ivChange,
      score,
      signalTag,
      timestamp: Date.now(),
    };
  }

  private simulateMarketData(token: string) {
    // Simulate random market data for testing
    const ltp = Math.random() * 100 + 50;
    const volume = Math.random() * 10000;
    const oi = Math.random() * 50000;
    const iv = Math.random() * 50 + 10;

    this.optionCacheService.updateTick(token, ltp, volume, oi, iv);
  }

  getAlerts(): ExplosionAlert[] {
    return this.alerts;
  }
}
