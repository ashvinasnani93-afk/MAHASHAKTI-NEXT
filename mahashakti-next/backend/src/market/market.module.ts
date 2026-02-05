import { Module } from '@nestjs/common';
import { AngelOneModule } from '../angel-one/angel-one.module';
import { MarketService } from './market.service';
import { MarketController } from './market.controller';

@Module({
  imports: [AngelOneModule],
  providers: [MarketService],
  controllers: [MarketController],
})
export class MarketModule {}
