import { Controller, Get, Query } from '@nestjs/common';
import { SignalGeneratorService } from './signal-generator.service';

@Controller('api/signals')
export class SignalsController {
  constructor(private signalGeneratorService: SignalGeneratorService) {}

  @Get()
  getSignals(@Query('symbol') symbol?: string) {
    // Mock data for testing
    const mockPrices = Array.from({ length: 100 }, (_, i) => 23000 + Math.random() * 500);
    const mockHighs = Array.from({ length: 100 }, (_, i) => 23100 + Math.random() * 500);
    const mockLows = Array.from({ length: 100 }, (_, i) => 22900 + Math.random() * 500);
    const mockVolume = Array.from({ length: 100 }, () => Math.random() * 10000);

    const symbols = symbol ? [symbol] : ['NIFTY', 'BANKNIFTY', 'FINNIFTY'];

    const signals = symbols.map((sym) =>
      this.signalGeneratorService.generateSignal(sym, mockPrices, mockHighs, mockLows, mockVolume),
    );

    return {
      success: true,
      data: signals,
    };
  }
}
