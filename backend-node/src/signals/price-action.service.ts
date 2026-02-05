import { Injectable, Logger } from '@nestjs/common';

interface CandlePattern {
  type: string;
  strength: 'STRONG' | 'MEDIUM' | 'WEAK';
  bullish: boolean;
  description: string;
}

@Injectable()
export class PriceActionService {
  private readonly logger = new Logger(PriceActionService.name);

  analyzeCandle(
    open: number,
    high: number,
    low: number,
    close: number,
  ): CandlePattern {
    const body = Math.abs(close - open);
    const range = high - low;
    const upperWick = high - Math.max(open, close);
    const lowerWick = Math.min(open, close) - low;

    const bodyRatio = body / range;
    const upperWickRatio = upperWick / range;
    const lowerWickRatio = lowerWick / range;

    // Doji - Indecision
    if (bodyRatio < 0.1) {
      return {
        type: 'DOJI',
        strength: 'WEAK',
        bullish: false,
        description: 'Indecision candle - Wait for confirmation',
      };
    }

    // Hammer - Bullish reversal
    if (close > open && lowerWickRatio > 0.6 && upperWickRatio < 0.1) {
      return {
        type: 'HAMMER',
        strength: 'STRONG',
        bullish: true,
        description: 'Bullish hammer - Strong buying pressure at lows',
      };
    }

    // Shooting Star - Bearish reversal
    if (close < open && upperWickRatio > 0.6 && lowerWickRatio < 0.1) {
      return {
        type: 'SHOOTING_STAR',
        strength: 'STRONG',
        bullish: false,
        description: 'Shooting star - Strong selling pressure at highs',
      };
    }

    // Bullish Engulfing
    if (close > open && bodyRatio > 0.7) {
      return {
        type: 'STRONG_BULLISH',
        strength: 'STRONG',
        bullish: true,
        description: 'Strong bullish candle - Big body, small wicks',
      };
    }

    // Bearish Engulfing
    if (close < open && bodyRatio > 0.7) {
      return {
        type: 'STRONG_BEARISH',
        strength: 'STRONG',
        bullish: false,
        description: 'Strong bearish candle - Big body, small wicks',
      };
    }

    // Long Wicks - Rejection
    if (upperWickRatio > 0.5 || lowerWickRatio > 0.5) {
      return {
        type: 'REJECTION',
        strength: 'MEDIUM',
        bullish: false,
        description: 'Rejection candle - Long wicks indicate resistance',
      };
    }

    // Default - Neutral
    return {
      type: 'NEUTRAL',
      strength: 'MEDIUM',
      bullish: close > open,
      description: 'Normal candle - No strong pattern',
    };
  }

  detectBreakout(
    prices: number[],
    volumes: number[],
    resistanceLevel: number,
  ): { isBreakout: boolean; isFake: boolean; reason: string } {
    if (prices.length < 2 || volumes.length < 2) {
      return { isBreakout: false, isFake: false, reason: 'Insufficient data' };
    }

    const currentPrice = prices[prices.length - 1];
    const previousPrice = prices[prices.length - 2];
    const currentVolume = volumes[volumes.length - 1];
    const avgVolume = volumes.slice(-10).reduce((a, b) => a + b, 0) / 10;

    // Check if price crossed resistance
    if (currentPrice > resistanceLevel && previousPrice <= resistanceLevel) {
      // Real breakout: High volume + Strong candle close
      if (currentVolume > avgVolume * 1.5) {
        return {
          isBreakout: true,
          isFake: false,
          reason: 'Real breakout with volume confirmation',
        };
      } else {
        return {
          isBreakout: true,
          isFake: true,
          reason: 'Fake breakout - Low volume',
        };
      }
    }

    return { isBreakout: false, isFake: false, reason: 'No breakout detected' };
  }

  detectBreakdown(
    prices: number[],
    volumes: number[],
    supportLevel: number,
  ): { isBreakdown: boolean; isFake: boolean; reason: string } {
    if (prices.length < 2 || volumes.length < 2) {
      return { isBreakdown: false, isFake: false, reason: 'Insufficient data' };
    }

    const currentPrice = prices[prices.length - 1];
    const previousPrice = prices[prices.length - 2];
    const currentVolume = volumes[volumes.length - 1];
    const avgVolume = volumes.slice(-10).reduce((a, b) => a + b, 0) / 10;

    // Check if price broke support
    if (currentPrice < supportLevel && previousPrice >= supportLevel) {
      // Real breakdown: High volume + Strong candle close
      if (currentVolume > avgVolume * 1.5) {
        return {
          isBreakdown: true,
          isFake: false,
          reason: 'Real breakdown with volume confirmation',
        };
      } else {
        return {
          isBreakdown: true,
          isFake: true,
          reason: 'Fake breakdown - Low volume',
        };
      }
    }

    return { isBreakdown: false, isFake: false, reason: 'No breakdown detected' };
  }
}
