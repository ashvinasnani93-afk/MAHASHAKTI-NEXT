import { Injectable, Logger } from '@nestjs/common';
import { AngelOneService } from '../angel-one/angel-one.service';
import { SymbolMasterService } from '../angel-one/symbol-master.service';

@Injectable()
export class MarketService {
  private readonly logger = new Logger(MarketService.name);

  constructor(
    private angelOneService: AngelOneService,
    private symbolMasterService: SymbolMasterService,
  ) {}

  async getDashboardData() {
    try {
      // Mock data for now - replace with real Angel One API calls
      const indices = [
        {
          symbol: 'NIFTY',
          name: 'NIFTY 50',
          ltp: 23450.50,
          change: 125.30,
          changePercent: 0.54,
        },
        {
          symbol: 'BANKNIFTY',
          name: 'BANK NIFTY',
          ltp: 50825.75,
          change: -245.80,
          changePercent: -0.48,
        },
        {
          symbol: 'FINNIFTY',
          name: 'FIN NIFTY',
          ltp: 22380.25,
          change: 89.50,
          changePercent: 0.40,
        },
      ];

      const topGainers = [
        { symbol: 'RELIANCE', ltp: 2850.50, change: 125.30, changePercent: 4.6 },
        { symbol: 'TCS', ltp: 3950.75, change: 165.25, changePercent: 4.4 },
        { symbol: 'INFY', ltp: 1845.20, change: 72.50, changePercent: 4.1 },
        { symbol: 'HDFCBANK', ltp: 1685.90, change: 58.40, changePercent: 3.6 },
        { symbol: 'ICICIBANK', ltp: 1295.50, change: 42.80, changePercent: 3.4 },
      ];

      const topLosers = [
        { symbol: 'WIPRO', ltp: 545.25, change: -28.75, changePercent: -5.0 },
        { symbol: 'TECHM', ltp: 1685.50, change: -82.50, changePercent: -4.7 },
        { symbol: 'HCLTECH', ltp: 1825.75, change: -75.25, changePercent: -4.0 },
        { symbol: 'AXISBANK', ltp: 1095.30, change: -38.70, changePercent: -3.4 },
        { symbol: 'KOTAKBANK', ltp: 1855.40, change: -55.60, changePercent: -2.9 },
      ];

      const upcomingIPOs = [
        {
          name: 'Tech Solutions Ltd',
          openDate: '2026-02-10',
          closeDate: '2026-02-12',
          priceRange: '₹300-₹320',
          gmp: 45,
          gmpPercent: 14.1,
        },
        {
          name: 'Green Energy Corp',
          openDate: '2026-02-15',
          closeDate: '2026-02-17',
          priceRange: '₹500-₹550',
          gmp: 75,
          gmpPercent: 13.6,
        },
      ];

      return {
        indices,
        topGainers,
        topLosers,
        upcomingIPOs,
      };
    } catch (error) {
      this.logger.error(`Error getting dashboard data: ${error.message}`);
      throw error;
    }
  }

  async getStocksByCategory(category: string) {
    // Mock data
    const stocks = [
      { symbol: 'RELIANCE', ltp: 2850.50, change: 125.30, changePercent: 4.6, volume: 5250000 },
      { symbol: 'TCS', ltp: 3950.75, change: 165.25, changePercent: 4.4, volume: 3150000 },
      { symbol: 'INFY', ltp: 1845.20, change: 72.50, changePercent: 4.1, volume: 7850000 },
      { symbol: 'HDFCBANK', ltp: 1685.90, change: 58.40, changePercent: 3.6, volume: 9250000 },
    ];

    return stocks;
  }

  async getSymbolDetail(symbol: string) {
    // Mock detailed data
    return {
      symbol,
      name: symbol,
      ltp: 2850.50,
      open: 2725.25,
      high: 2875.80,
      low: 2710.50,
      prevClose: 2725.20,
      volume: 5250000,
      change: 125.30,
      changePercent: 4.6,
      avgTradePrice: 2800.25,
      hasOptions: true,
    };
  }

  async getCommodities() {
    return [
      { symbol: 'GOLD', name: 'Gold', ltp: 72850.50, change: 325.80, changePercent: 0.45 },
      { symbol: 'SILVER', name: 'Silver', ltp: 85240.75, change: -185.25, changePercent: -0.22 },
      {
        symbol: 'CRUDEOIL',
        name: 'Crude Oil',
        ltp: 6825.30,
        change: 125.50,
        changePercent: 1.87,
      },
      {
        symbol: 'NATURALGAS',
        name: 'Natural Gas',
        ltp: 245.50,
        change: -8.25,
        changePercent: -3.25,
      },
    ];
  }

  async searchSymbols(query: string) {
    // Mock search results
    const allSymbols = [
      { symbol: 'NIFTY', name: 'NIFTY 50', type: 'INDEX' },
      { symbol: 'BANKNIFTY', name: 'BANK NIFTY', type: 'INDEX' },
      { symbol: 'RELIANCE', name: 'Reliance Industries', type: 'STOCK' },
      { symbol: 'TCS', name: 'Tata Consultancy Services', type: 'STOCK' },
      { symbol: 'GOLD', name: 'Gold', type: 'COMMODITY' },
    ];

    return allSymbols.filter(
      (s) =>
        s.symbol.toLowerCase().includes(query.toLowerCase()) ||
        s.name.toLowerCase().includes(query.toLowerCase()),
    );
  }
}
