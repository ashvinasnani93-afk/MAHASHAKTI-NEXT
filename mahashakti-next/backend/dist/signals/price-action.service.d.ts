interface CandlePattern {
    type: string;
    strength: 'STRONG' | 'MEDIUM' | 'WEAK';
    bullish: boolean;
    description: string;
}
export declare class PriceActionService {
    private readonly logger;
    analyzeCandle(open: number, high: number, low: number, close: number): CandlePattern;
    detectBreakout(prices: number[], volumes: number[], resistanceLevel: number): {
        isBreakout: boolean;
        isFake: boolean;
        reason: string;
    };
    detectBreakdown(prices: number[], volumes: number[], supportLevel: number): {
        isBreakdown: boolean;
        isFake: boolean;
        reason: string;
    };
}
export {};
