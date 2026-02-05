import { Injectable, Logger } from '@nestjs/common';

interface MarketStructure {
  structure: string; // BULLISH, BEARISH, SIDEWAYS
  higherHigh: boolean;
  higherLow: boolean;
  lowerHigh: boolean;
  lowerLow: boolean;
}

@Injectable()
export class MarketStructureService {
  private readonly logger = new Logger(MarketStructureService.name);

  analyzeStructure(highs: number[], lows: number[]): MarketStructure {
    if (highs.length < 3 || lows.length < 3) {
      return {
        structure: 'SIDEWAYS',
        higherHigh: false,
        higherLow: false,
        lowerHigh: false,
        lowerLow: false,
      };
    }

    // Check last 3 highs and lows
    const recentHighs = highs.slice(-3);
    const recentLows = lows.slice(-3);

    // Higher High and Higher Low = Bullish Structure
    const higherHigh = recentHighs[2] > recentHighs[1] && recentHighs[1] > recentHighs[0];
    const higherLow = recentLows[2] > recentLows[1] && recentLows[1] > recentLows[0];

    // Lower High and Lower Low = Bearish Structure
    const lowerHigh = recentHighs[2] < recentHighs[1] && recentHighs[1] < recentHighs[0];
    const lowerLow = recentLows[2] < recentLows[1] && recentLows[1] < recentLows[0];

    let structure = 'SIDEWAYS';

    if (higherHigh && higherLow) {
      structure = 'BULLISH';
    } else if (lowerHigh && lowerLow) {
      structure = 'BEARISH';
    }

    return {
      structure,
      higherHigh,
      higherLow,
      lowerHigh,
      lowerLow,
    };
  }
}
