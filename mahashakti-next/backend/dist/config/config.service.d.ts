export declare class ConfigService {
    get angelApiKey(): string;
    get angelClientId(): string;
    get angelPassword(): string;
    get angelTotpSecret(): string;
    get mongoUrl(): string;
    get dbName(): string;
    get port(): number;
    get corsOrigins(): string;
    get scannerInterval(): number;
    get cacheDuration(): number;
    get vixThreshold(): number;
    get explosionPriceChange(): number;
    get explosionVolumeSpike(): number;
    get explosionOiChange(): number;
    get explosionIvChange(): number;
    get explosionScoreThreshold(): number;
    getStrikeRange(symbol: string): number;
}
