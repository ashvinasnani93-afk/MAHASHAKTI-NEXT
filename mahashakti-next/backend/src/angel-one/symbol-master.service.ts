import { Injectable, Logger } from '@nestjs/common';
import axios from 'axios';

interface OptionContract {
  symbol: string;
  name: string;
  token: string;
  exchange: string;
  strike: number;
  optionType: string;
  expiry: string;
  expiryDate: string;
  lotSize: number;
}

@Injectable()
export class SymbolMasterService {
  private readonly logger = new Logger(SymbolMasterService.name);
  private symbolsData: any[] = [];
  private fnoSymbols: string[] = [];

  async loadSymbolMaster(): Promise<boolean> {
    try {
      const url =
        'https://margincalculator.angelbroking.com/OpenAPI_File/files/OpenAPIScripMaster.json';

      const response = await axios.get(url, { timeout: 30000 });

      if (response.status === 200) {
        this.symbolsData = response.data;
        this.logger.log(`✅ Loaded ${this.symbolsData.length} symbols`);
        return true;
      }

      this.logger.error(`❌ Failed to load symbol master: ${response.status}`);
      return false;
    } catch (error) {
      this.logger.error(`❌ Error loading symbol master: ${error.message}`);
      return false;
    }
  }

  getFnoStocks(): string[] {
    if (!this.symbolsData.length) {
      return [];
    }

    try {
      const fnoData = this.symbolsData.filter(
        (item) =>
          item.exch_seg === 'NFO' &&
          (item.instrumenttype === 'OPTIDX' || item.instrumenttype === 'OPTSTK'),
      );

      const uniqueNames = new Set<string>();
      fnoData.forEach((item) => uniqueNames.add(item.name));

      this.fnoSymbols = Array.from(uniqueNames);
      return this.fnoSymbols;
    } catch (error) {
      this.logger.error(`Error getting F&O stocks: ${error.message}`);
      return [];
    }
  }

  getOptionContracts(
    underlying: string,
    weekly: boolean = true,
    monthly: boolean = true,
  ): OptionContract[] {
    if (!this.symbolsData.length) {
      return [];
    }

    try {
      const today = new Date();

      // Filter options for this underlying
      const optionsData = this.symbolsData.filter(
        (item) =>
          item.name === underlying &&
          (item.instrumenttype === 'OPTIDX' || item.instrumenttype === 'OPTSTK'),
      );

      if (!optionsData.length) {
        return [];
      }

      // Parse expiry dates and filter
      const contracts: OptionContract[] = [];

      for (const item of optionsData) {
        try {
          const expiryDate = this.parseExpiry(item.expiry);
          if (!expiryDate || expiryDate < today) continue;

          // Get current week and month end
          const currentWeekEnd = this.getWeekEnd(today);
          const currentMonthEnd = this.getMonthEnd(today);

          // Filter by weekly/monthly
          if ((weekly && expiryDate <= currentWeekEnd) || (monthly && expiryDate <= currentMonthEnd)) {
            contracts.push({
              symbol: item.symbol,
              name: item.name,
              token: item.token,
              exchange: item.exch_seg,
              strike: parseFloat(item.strike) / 100,
              optionType: item.symbol.slice(-2), // CE or PE
              expiry: item.expiry,
              expiryDate: expiryDate.toISOString().split('T')[0],
              lotSize: parseInt(item.lotsize || '1', 10),
            });
          }
        } catch (err) {
          continue;
        }
      }

      return contracts;
    } catch (error) {
      this.logger.error(`Error getting option contracts for ${underlying}: ${error.message}`);
      return [];
    }
  }

  getAllIndexOptions(): OptionContract[] {
    const allOptions: OptionContract[] = [];
    const indices = ['NIFTY', 'BANKNIFTY', 'FINNIFTY'];

    for (const index of indices) {
      const options = this.getOptionContracts(index, true, true);
      allOptions.push(...options);
    }

    return allOptions;
  }

  getToken(symbol: string, exchange: string = 'NSE'): string | null {
    if (!this.symbolsData.length) {
      return null;
    }

    const match = this.symbolsData.find(
      (item) => item.symbol === symbol && item.exch_seg === exchange,
    );

    return match ? match.token : null;
  }

  private parseExpiry(expiryStr: string): Date | null {
    try {
      // Format: 23JAN2026
      const day = parseInt(expiryStr.slice(0, 2), 10);
      const monthStr = expiryStr.slice(2, 5);
      const year = parseInt(expiryStr.slice(5), 10);

      const months: { [key: string]: number } = {
        JAN: 0,
        FEB: 1,
        MAR: 2,
        APR: 3,
        MAY: 4,
        JUN: 5,
        JUL: 6,
        AUG: 7,
        SEP: 8,
        OCT: 9,
        NOV: 10,
        DEC: 11,
      };

      const month = months[monthStr];
      if (month === undefined) return null;

      return new Date(year, month, day);
    } catch {
      return null;
    }
  }

  private getWeekEnd(date: Date): Date {
    const dayOfWeek = date.getDay();
    const daysUntilThursday = (4 - dayOfWeek + 7) % 7;
    const weekEnd = new Date(date);
    weekEnd.setDate(date.getDate() + daysUntilThursday);
    return weekEnd;
  }

  private getMonthEnd(date: Date): Date {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0);
  }
}
