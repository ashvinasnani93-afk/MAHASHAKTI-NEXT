interface TechnicalIndicators {
    ema20: number;
    ema50: number;
    rsi: number;
    macdSignal: string;
    trend: string;
}
export declare class TechnicalEngineService {
    private readonly logger;
    calculateIndicators(prices: number[]): TechnicalIndicators | null;
    isOverbought(rsi: number): boolean;
    isOversold(rsi: number): boolean;
}
export {};
