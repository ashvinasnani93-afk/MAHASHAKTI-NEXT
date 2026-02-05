import { Injectable, Logger } from '@nestjs/common';
import NodeCache from 'node-cache';
import { ConfigService } from '../config/config.service';

interface TickHistory {
  ltp: number[];
  volume: number[];
  oi: number[];
  iv: number[];
  timestamps: number[];
}

@Injectable()
export class OptionCacheService {
  private readonly logger = new Logger(OptionCacheService.name);
  private cache: NodeCache;
  private readonly maxHistorySize = 150; // 5 minutes at 2 sec interval

  constructor(private configService: ConfigService) {
    this.cache = new NodeCache({
      stdTTL: this.configService.cacheDuration / 1000,
      checkperiod: 60,
    });
  }

  updateTick(token: string, ltp: number, volume: number, oi: number, iv: number) {
    const history = this.getHistory(token);
    const timestamp = Date.now();

    history.ltp.push(ltp);
    history.volume.push(volume);
    history.oi.push(oi);
    history.iv.push(iv);
    history.timestamps.push(timestamp);

    // Keep only last 5 minutes
    if (history.ltp.length > this.maxHistorySize) {
      history.ltp.shift();
      history.volume.shift();
      history.oi.shift();
      history.iv.shift();
      history.timestamps.shift();
    }

    this.cache.set(token, history);
  }

  getHistory(token: string): TickHistory {
    const existing = this.cache.get<TickHistory>(token);
    if (existing) {
      return existing;
    }

    return {
      ltp: [],
      volume: [],
      oi: [],
      iv: [],
      timestamps: [],
    };
  }

  getPriceChange(token: string): number {
    const history = this.getHistory(token);
    if (history.ltp.length < 2) return 0;

    const current = history.ltp[history.ltp.length - 1];
    const old = history.ltp[0];

    if (old === 0) return 0;
    return ((current - old) / old) * 100;
  }

  getVolumeSpike(token: string): number {
    const history = this.getHistory(token);
    if (history.volume.length < 2) return 0;

    const current = history.volume[history.volume.length - 1];
    const avg = history.volume.slice(0, -1).reduce((a, b) => a + b, 0) / (history.volume.length - 1);

    if (avg === 0) return 0;
    return current / avg;
  }

  getOIChange(token: string): number {
    const history = this.getHistory(token);
    if (history.oi.length < 2) return 0;

    const current = history.oi[history.oi.length - 1];
    const old = history.oi[0];

    if (old === 0) return 0;
    return ((current - old) / old) * 100;
  }

  getIVChange(token: string): number {
    const history = this.getHistory(token);
    if (history.iv.length < 2) return 0;

    const current = history.iv[history.iv.length - 1];
    const old = history.iv[0];

    if (old === 0) return 0;
    return ((current - old) / old) * 100;
  }

  clearCache() {
    this.cache.flushAll();
  }
}
