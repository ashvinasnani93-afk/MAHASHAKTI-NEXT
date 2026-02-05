import { Module } from '@nestjs/common';
import { ConfigModule } from './config/config.module';
import { DatabaseModule } from './database/database.module';
import { AngelOneModule } from './angel-one/angel-one.module';
import { ScannerModule } from './scanner/scanner.module';
import { SignalsModule } from './signals/signals.module';
import { MarketModule } from './market/market.module';

@Module({
  imports: [
    ConfigModule,
    DatabaseModule,
    AngelOneModule,
    ScannerModule,
    SignalsModule,
    MarketModule,
  ],
})
export class AppModule {}
