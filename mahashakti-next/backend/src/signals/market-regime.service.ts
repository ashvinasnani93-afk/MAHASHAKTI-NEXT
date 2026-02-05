import { Injectable, Logger } from '@nestjs/common';

export enum MarketRegime {
  TRENDING_UP = 'TRENDING_UP',
  TRENDING_DOWN = 'TRENDING_DOWN',
  SIDEWAYS = 'SIDEWAYS',
  HIGH_RISK = 'HIGH_RISK',
  NO_TRADE = 'NO_TRADE',
}

interface RegimeAnalysis {
  regime: MarketRegime;
  confidence: number;
  trendStrength: number;
  volatility: number;
}

@Injectable()
export class MarketRegimeService {
  private readonly logger = new Logger(MarketRegimeService.name);

  analyzeRegime(prices: number[], volume: number[], atr: number[]): RegimeAnalysis {
    try {
      if (prices.length < 20) {
        return {
          regime: MarketRegime.NO_TRADE,
          confidence: 0,
          trendStrength: 0,
          volatility: 0,
        };
      }

      // Calculate trend strength
      const trendStrength = this.calculateTrendStrength(prices);

      // Calculate volatility
      const volatility = this.calculateVolatility(prices, atr);

      // Determine regime
      let regime = MarketRegime.SIDEWAYS;
      let confidence = 0;

      // High volatility = High Risk
      if (volatility > 2.5) {
        regime = MarketRegime.HIGH_RISK;
        confidence = 0.9;
      }
      // Strong uptrend
      else if (trendStrength > 0.6) {
        regime = MarketRegime.TRENDING_UP;
        confidence = trendStrength;
      }
      // Strong downtrend
      else if (trendStrength < -0.6) {
        regime = MarketRegime.TRENDING_DOWN;
        confidence = Math.abs(trendStrength);
      }
      // Sideways market
      else if (Math.abs(trendStrength) < 0.3) {
        regime = MarketRegime.SIDEWAYS;
        confidence = 0.7;
      }
      // Weekend or after hours
      else if (this.isNonTradingTime()) {
        regime = MarketRegime.NO_TRADE;
        confidence = 1.0;
      }

      return {
        regime,
        confidence,
        trendStrength,
        volatility,
      };
    } catch (error) {
      this.logger.error(`Error analyzing market regime: ${error.message}`);
      return {
        regime: MarketRegime.NO_TRADE,
        confidence: 0,
        trendStrength: 0,
        volatility: 0,
      };
    }
  }

  private calculateTrendStrength(prices: number[]): number {
    if (prices.length < 20) return 0;

    // Linear regression slope
    const n = prices.length;
    const x = Array.from({ length: n }, (_, i) => i);
    const y = prices;

    const sumX = x.reduce((a, b) => a + b, 0);
    const sumY = y.reduce((a, b) => a + b, 0);
    const sumXY = x.reduce((sum, xi, i) => sum + xi * y[i], 0);
    const sumX2 = x.reduce((sum, xi) => sum + xi * xi, 0);

    const slope = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);

    // Normalize slope to -1 to 1 range
    const avgPrice = sumY / n;
    const normalizedSlope = slope / avgPrice;

    return Math.max(-1, Math.min(1, normalizedSlope * 100));
  }

  private calculateVolatility(prices: number[], atr: number[]): number {
    if (atr.length === 0) {
      // Fallback: Standard deviation
      const mean = prices.reduce((a, b) => a + b, 0) / prices.length;
      const variance = prices.reduce((sum, price) => sum + Math.pow(price - mean, 2), 0) / prices.length;
      const stdDev = Math.sqrt(variance);
      return (stdDev / mean) * 100;
    }

    // Use ATR
    const currentATR = atr[atr.length - 1];
    const avgATR = atr.reduce((a, b) => a + b, 0) / atr.length;
    return currentATR / avgATR;
  }

  private isNonTradingTime(): boolean {
    const now = new Date();
    const day = now.getDay(); // 0 = Sunday, 6 = Saturday
    const hours = now.getHours();

    // Weekend
    if (day === 0 || day === 6) return true;

    // After hours (3:30 PM to 9:15 AM IST)
    // Simplified check
    if (hours < 9 || hours >= 16) return true;

    return false;
  }

  shouldBlock(regime: MarketRegime): boolean {
    return regime === MarketRegime.HIGH_RISK || regime === MarketRegime.NO_TRADE;
  }
}
