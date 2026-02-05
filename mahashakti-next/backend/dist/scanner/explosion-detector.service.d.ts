import { OnModuleInit } from '@nestjs/common';
import { OptionUniverseService } from './option-universe.service';
import { StrikeFilterService } from './strike-filter.service';
import { OptionCacheService } from './option-cache.service';
import { ConfigService } from '../config/config.service';
import { ScannerGateway } from './scanner.gateway';
export interface ExplosionAlert {
    symbol: string;
    strike: number;
    optionType: string;
    ltp: number;
    priceChange: number;
    volumeSpike: number;
    oiChange: number;
    ivChange: number;
    score: number;
    signalTag: string;
    timestamp: number;
}
export declare class ExplosionDetectorService implements OnModuleInit {
    private optionUniverseService;
    private strikeFilterService;
    private optionCacheService;
    private configService;
    private scannerGateway;
    private readonly logger;
    private scannerInterval;
    private alerts;
    constructor(optionUniverseService: OptionUniverseService, strikeFilterService: StrikeFilterService, optionCacheService: OptionCacheService, configService: ConfigService, scannerGateway: ScannerGateway);
    onModuleInit(): Promise<void>;
    startScanner(): void;
    stopScanner(): void;
    private scan;
    private detectExplosion;
    private simulateMarketData;
    getAlerts(): ExplosionAlert[];
}
