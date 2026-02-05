import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { SymbolMasterService } from '../angel-one/symbol-master.service';

interface OptionUniverse {
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
export class OptionUniverseService implements OnModuleInit {
  private readonly logger = new Logger(OptionUniverseService.name);
  private optionUniverse: OptionUniverse[] = [];

  constructor(private symbolMasterService: SymbolMasterService) {}

  async onModuleInit() {
    await this.loadUniverse();
  }

  async loadUniverse() {
    try {
      // Load symbol master first
      await this.symbolMasterService.loadSymbolMaster();

      // Get all index options
      const indexOptions = this.symbolMasterService.getAllIndexOptions();

      // Get F&O stocks
      const fnoStocks = this.symbolMasterService.getFnoStocks();

      // Get stock options (limit to liquid F&O stocks)
      const stockOptions: OptionUniverse[] = [];
      for (const stock of fnoStocks.slice(0, 100)) {
        // Limit for performance
        const options = this.symbolMasterService.getOptionContracts(stock, true, true);
        stockOptions.push(...options);
      }

      this.optionUniverse = [...indexOptions, ...stockOptions];

      this.logger.log(`✅ Loaded ${this.optionUniverse.length} option contracts`);
    } catch (error) {
      this.logger.error(`❌ Error loading option universe: ${error.message}`);
    }
  }

  getUniverse(): OptionUniverse[] {
    return this.optionUniverse;
  }

  getByUnderlying(underlying: string): OptionUniverse[] {
    return this.optionUniverse.filter((opt) => opt.name === underlying);
  }
}
