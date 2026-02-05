import { Injectable, Logger } from '@nestjs/common';
import { SMA, EMA, RSI, MACD } from 'technicalindicators';

interface TechnicalIndicators {
  ema20: number;
  ema50: number;
  rsi: number;
  macdSignal: string;
  trend: string;
}

@Injectable()
export class TechnicalEngineService {
  private readonly logger = new Logger(TechnicalEngineService.name);

  calculateIndicators(prices: number[]): TechnicalIndicators | null {
    try {
      if (prices.length < 50) {
        return null;
      }

      // Calculate EMA 20
      const ema20Array = EMA.calculate({ period: 20, values: prices });
      const ema20 = ema20Array[ema20Array.length - 1];

      // Calculate EMA 50
      const ema50Array = EMA.calculate({ period: 50, values: prices });
      const ema50 = ema50Array[ema50Array.length - 1];

      // Calculate RSI
      const rsiArray = RSI.calculate({ period: 14, values: prices });
      const rsi = rsiArray[rsiArray.length - 1];

      // Determine trend
      const currentPrice = prices[prices.length - 1];
      let trend = 'SIDEWAYS';

      if (currentPrice > ema20 && ema20 > ema50) {
        trend = 'UPTREND';
      } else if (currentPrice < ema20 && ema20 < ema50) {
        trend = 'DOWNTREND';
      }

      // MACD Signal
      const macdInput = {
        values: prices,
        fastPeriod: 12,
        slowPeriod: 26,
        signalPeriod: 9,
        SimpleMAOscillator: false,
        SimpleMASignal: false,
      };

      const macdArray = MACD.calculate(macdInput);
      const macd = macdArray[macdArray.length - 1];

      let macdSignal = 'NEUTRAL';
      if (macd && macd.MACD > macd.signal) {
        macdSignal = 'BULLISH';
      } else if (macd && macd.MACD < macd.signal) {
        macdSignal = 'BEARISH';
      }

      return {
        ema20,
        ema50,
        rsi,
        macdSignal,
        trend,
      };
    } catch (error) {
      this.logger.error(`Error calculating indicators: ${error.message}`);
      return null;
    }
  }

  isOverbought(rsi: number): boolean {
    return rsi >= 70;
  }

  isOversold(rsi: number): boolean {
    return rsi <= 30;
  }
}
