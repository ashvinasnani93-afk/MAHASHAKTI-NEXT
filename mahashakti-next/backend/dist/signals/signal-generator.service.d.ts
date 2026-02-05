import { TechnicalEngineService } from './technical-engine.service';
import { MarketStructureService } from './market-structure.service';
import { MarketRegimeService } from './market-regime.service';
import { SafetyLayerService } from './safety-layer.service';
import { PriceActionService } from './price-action.service';
export interface Signal {
    symbol: string;
    signal: 'STRONG BUY' | 'BUY' | 'SELL' | 'STRONG SELL' | 'WAIT';
    ltp: number;
    change: number;
    reason: string;
    timestamp: number;
    confidence: number;
    regime: string;
    safetyStatus: string;
    priceAction: string;
}
export declare class SignalGeneratorService {
    private technicalEngineService;
    private marketStructureService;
    private marketRegimeService;
    private safetyLayerService;
    private priceActionService;
    private readonly logger;
    constructor(technicalEngineService: TechnicalEngineService, marketStructureService: MarketStructureService, marketRegimeService: MarketRegimeService, safetyLayerService: SafetyLayerService, priceActionService: PriceActionService);
    generateSignal(symbol: string, prices: number[], highs: number[], lows: number[], volume: number[], opens: number[], vix?: number): Signal;
    private waitSignal;
    private createBlockedSignal;
}
