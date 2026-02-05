import { Module } from '@nestjs/common';
import { AngelOneModule } from '../angel-one/angel-one.module';
import { ScannerModule } from '../scanner/scanner.module';
import { TechnicalEngineService } from './technical-engine.service';
import { MarketStructureService } from './market-structure.service';
import { MarketRegimeService } from './market-regime.service';
import { SafetyLayerService } from './safety-layer.service';
import { PriceActionService } from './price-action.service';
import { SignalGeneratorService } from './signal-generator.service';
import { SignalsController } from './signals.controller';

@Module({
  imports: [AngelOneModule, ScannerModule],
  providers: [
    TechnicalEngineService,
    MarketStructureService,
    MarketRegimeService,
    SafetyLayerService,
    PriceActionService,
    SignalGeneratorService,
  ],
  controllers: [SignalsController],
  exports: [SignalGeneratorService],
})
export class SignalsModule {}
