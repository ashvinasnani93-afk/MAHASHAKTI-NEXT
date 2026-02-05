import { Controller, Get, Query } from '@nestjs/common';
import { MarketService } from './market.service';

@Controller('api/market')
export class MarketController {
  constructor(private marketService: MarketService) {}

  @Get('/dashboard')
  async getDashboard() {
    const data = await this.marketService.getDashboardData();
    return {
      success: true,
      data,
    };
  }

  @Get('/stocks')
  async getStocks(@Query('category') category: string) {
    const data = await this.marketService.getStocksByCategory(category);
    return {
      success: true,
      data,
    };
  }

  @Get('/movers')
  async getMovers(@Query('minChange') minChange: string, @Query('maxChange') maxChange: string) {
    const min = parseFloat(minChange || '15');
    const max = parseFloat(maxChange || '20');
    const data = await this.marketService.getBigMovers(min, max);
    return {
      success: true,
      data,
    };
  }

  @Get('/symbol/:symbol')
  async getSymbolDetail(@Param('symbol') symbol: string) {
    const data = await this.marketService.getSymbolDetail(symbol);
    return {
      success: true,
      data,
    };
  }

  @Get('/commodities')
  async getCommodities() {
    const data = await this.marketService.getCommodities();
    return {
      success: true,
      data,
    };
  }

  @Get('/search')
  async search(@Query('q') query: string) {
    const data = await this.marketService.searchSymbols(query);
    return {
      success: true,
      data,
    };
  }
}
