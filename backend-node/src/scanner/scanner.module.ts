import { Module } from '@nestjs/common';
import { AngelOneModule } from '../angel-one/angel-one.module';
import { OptionUniverseService } from './option-universe.service';
import { StrikeFilterService } from './strike-filter.service';
import { OptionCacheService } from './option-cache.service';
import { ExplosionDetectorService } from './explosion-detector.service';
import { ScannerGateway } from './scanner.gateway';
import { ScannerController } from './scanner.controller';

@Module({
  imports: [AngelOneModule],
  providers: [
    OptionUniverseService,
    StrikeFilterService,
    OptionCacheService,
    ExplosionDetectorService,
    ScannerGateway,
  ],
  controllers: [ScannerController],
  exports: [ExplosionDetectorService, OptionCacheService],
})
export class ScannerModule {}
