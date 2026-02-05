import { ConfigService } from '../config/config.service';
interface TickHistory {
    ltp: number[];
    volume: number[];
    oi: number[];
    iv: number[];
    timestamps: number[];
}
export declare class OptionCacheService {
    private configService;
    private readonly logger;
    private cache;
    private readonly maxHistorySize;
    constructor(configService: ConfigService);
    updateTick(token: string, ltp: number, volume: number, oi: number, iv: number): void;
    getHistory(token: string): TickHistory;
    getPriceChange(token: string): number;
    getVolumeSpike(token: string): number;
    getOIChange(token: string): number;
    getIVChange(token: string): number;
    clearCache(): void;
}
export {};
