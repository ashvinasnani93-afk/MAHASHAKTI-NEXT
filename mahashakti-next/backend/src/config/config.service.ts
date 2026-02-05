import { Injectable } from '@nestjs/common';
import * as dotenv from 'dotenv';

dotenv.config();

@Injectable()
export class ConfigService {
  // Angel One Credentials
  get angelApiKey(): string {
    return process.env.ANGEL_API_KEY || '';
  }

  get angelClientId(): string {
    return process.env.ANGEL_CLIENT_ID || '';
  }

  get angelPassword(): string {
    return process.env.ANGEL_PASSWORD || '';
  }

  get angelTotpSecret(): string {
    return process.env.ANGEL_TOTP_SECRET || '';
  }

  // MongoDB
  get mongoUrl(): string {
    return process.env.MONGO_URL || 'mongodb://localhost:27017';
  }

  get dbName(): string {
    return process.env.DB_NAME || 'mahashakti_db';
  }

  // Server Config
  get port(): number {
    return parseInt(process.env.PORT || '3000', 10);
  }

  get corsOrigins(): string {
    return process.env.CORS_ORIGINS || '*';
  }

  // Scanner Config
  get scannerInterval(): number {
    return parseInt(process.env.SCANNER_INTERVAL || '2000', 10);
  }

  get cacheDuration(): number {
    return parseInt(process.env.CACHE_DURATION || '300000', 10);
  }

  // Thresholds
  get vixThreshold(): number {
    return parseFloat(process.env.VIX_THRESHOLD || '25');
  }

  get explosionPriceChange(): number {
    return parseFloat(process.env.EXPLOSION_PRICE_CHANGE || '40');
  }

  get explosionVolumeSpike(): number {
    return parseFloat(process.env.EXPLOSION_VOLUME_SPIKE || '5');
  }

  get explosionOiChange(): number {
    return parseFloat(process.env.EXPLOSION_OI_CHANGE || '15');
  }

  get explosionIvChange(): number {
    return parseFloat(process.env.EXPLOSION_IV_CHANGE || '10');
  }

  get explosionScoreThreshold(): number {
    return parseInt(process.env.EXPLOSION_SCORE_THRESHOLD || '8', 10);
  }

  // Strike Range
  getStrikeRange(symbol: string): number {
    if (symbol.includes('NIFTY') && !symbol.includes('BANK')) return 30;
    if (symbol.includes('BANKNIFTY')) return 40;
    if (symbol.includes('FINNIFTY')) return 30;
    return 20; // Stocks
  }
}
