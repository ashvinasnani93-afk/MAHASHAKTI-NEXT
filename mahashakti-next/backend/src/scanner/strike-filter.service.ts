import { Injectable, Logger } from '@nestjs/common';
import { AngelOneService } from '../angel-one/angel-one.service';
import { ConfigService } from '../config/config.service';

interface FilteredStrike {
  symbol: string;
  token: string;
  strike: number;
  optionType: string;
}

@Injectable()
export class StrikeFilterService {
  private readonly logger = new Logger(StrikeFilterService.name);

  constructor(
    private angelOneService: AngelOneService,
    private configService: ConfigService,
  ) {}

  async filterStrikes(underlying: string, allStrikes: any[]): Promise<FilteredStrike[]> {
    try {
      // Get current LTP of underlying
      const atmStrike = await this.getATM(underlying);
      if (!atmStrike) {
        return [];
      }

      // Get strike range
      const range = this.configService.getStrikeRange(underlying);

      // Filter strikes within ATM ± range
      const uniqueStrikes = new Set<number>();
      allStrikes.forEach((strike) => uniqueStrikes.add(strike.strike));

      const sortedStrikes = Array.from(uniqueStrikes).sort((a, b) => a - b);

      // Find ATM index
      let atmIndex = 0;
      for (let i = 0; i < sortedStrikes.length; i++) {
        if (sortedStrikes[i] >= atmStrike) {
          atmIndex = i;
          break;
        }
      }

      // Get strikes within range
      const startIndex = Math.max(0, atmIndex - range);
      const endIndex = Math.min(sortedStrikes.length - 1, atmIndex + range);
      const relevantStrikes = sortedStrikes.slice(startIndex, endIndex + 1);

      // Filter original strikes
      const filtered = allStrikes.filter((strike) => relevantStrikes.includes(strike.strike));

      this.logger.log(
        `✅ Filtered ${filtered.length} strikes for ${underlying} (ATM: ${atmStrike}, Range: ±${range})`,
      );

      return filtered.map((s) => ({
        symbol: s.symbol,
        token: s.token,
        strike: s.strike,
        optionType: s.optionType,
      }));
    } catch (error) {
      this.logger.error(`Error filtering strikes: ${error.message}`);
      return [];
    }
  }

  private async getATM(underlying: string): Promise<number | null> {
    try {
      // Get LTP from Angel One
      // For now, using mock data
      const mockPrices: { [key: string]: number } = {
        NIFTY: 23500,
        BANKNIFTY: 51000,
        FINNIFTY: 22500,
      };

      return mockPrices[underlying] || 1000;
    } catch (error) {
      this.logger.error(`Error getting ATM: ${error.message}`);
      return null;
    }
  }
}
