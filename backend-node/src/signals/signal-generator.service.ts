import { Injectable, Logger } from '@nestjs/common';
import { TechnicalEngineService } from './technical-engine.service';
import { MarketStructureService } from './market-structure.service';

export interface Signal {
  symbol: string;
  signal: 'BUY' | 'SELL' | 'STRONG BUY' | 'STRONG SELL' | 'WAIT';
  ltp: number;
  change: number;
  reason: string;
  timestamp: number;
}

@Injectable()
export class SignalGeneratorService {
  private readonly logger = new Logger(SignalGeneratorService.name);

  constructor(
    private technicalEngineService: TechnicalEngineService,
    private marketStructureService: MarketStructureService,
  ) {}

  generateSignal(
    symbol: string,
    prices: number[],
    highs: number[],
    lows: number[],
    volume: number[],
  ): Signal {
    try {
      const indicators = this.technicalEngineService.calculateIndicators(prices);
      const structure = this.marketStructureService.analyzeStructure(highs, lows);

      if (!indicators) {
        return this.waitSignal(symbol, prices);
      }

      const currentPrice = prices[prices.length - 1];
      const previousPrice = prices[prices.length - 2];
      const change = ((currentPrice - previousPrice) / previousPrice) * 100;

      // Volume confirmation
      const avgVolume = volume.slice(-10).reduce((a, b) => a + b, 0) / 10;
      const currentVolume = volume[volume.length - 1];
      const volumeConfirmed = currentVolume > avgVolume;

      // Strong Buy Conditions
      if (
        indicators.trend === 'UPTREND' &&
        structure.structure === 'BULLISH' &&
        indicators.macdSignal === 'BULLISH' &&
        !this.technicalEngineService.isOverbought(indicators.rsi) &&
        volumeConfirmed
      ) {
        return {
          symbol,
          signal: 'STRONG BUY',
          ltp: currentPrice,
          change,
          reason: 'Strong uptrend with bullish structure and volume confirmation',
          timestamp: Date.now(),
        };
      }

      // Strong Sell Conditions
      if (
        indicators.trend === 'DOWNTREND' &&
        structure.structure === 'BEARISH' &&
        indicators.macdSignal === 'BEARISH' &&
        !this.technicalEngineService.isOversold(indicators.rsi) &&
        volumeConfirmed
      ) {
        return {
          symbol,
          signal: 'STRONG SELL',
          ltp: currentPrice,
          change,
          reason: 'Strong downtrend with bearish structure and volume confirmation',
          timestamp: Date.now(),
        };
      }

      // Buy Conditions
      if (indicators.trend === 'UPTREND' && indicators.macdSignal === 'BULLISH') {
        return {
          symbol,
          signal: 'BUY',
          ltp: currentPrice,
          change,
          reason: 'Uptrend with bullish MACD',
          timestamp: Date.now(),
        };
      }

      // Sell Conditions
      if (indicators.trend === 'DOWNTREND' && indicators.macdSignal === 'BEARISH') {
        return {
          symbol,
          signal: 'SELL',
          ltp: currentPrice,
          change,
          reason: 'Downtrend with bearish MACD',
          timestamp: Date.now(),
        };
      }

      // Default: WAIT
      return this.waitSignal(symbol, prices);
    } catch (error) {
      this.logger.error(`Error generating signal for ${symbol}: ${error.message}`);
      return this.waitSignal(symbol, prices);
    }
  }

  private waitSignal(symbol: string, prices: number[]): Signal {
    const currentPrice = prices[prices.length - 1];
    const previousPrice = prices[prices.length - 2] || currentPrice;
    const change = previousPrice ? ((currentPrice - previousPrice) / previousPrice) * 100 : 0;

    return {
      symbol,
      signal: 'WAIT',
      ltp: currentPrice,
      change,
      reason: 'No clear signal - sideways or conflicting indicators',
      timestamp: Date.now(),
    };
  }
}
