export declare enum MarketRegime {
    TRENDING_UP = "TRENDING_UP",
    TRENDING_DOWN = "TRENDING_DOWN",
    SIDEWAYS = "SIDEWAYS",
    HIGH_RISK = "HIGH_RISK",
    NO_TRADE = "NO_TRADE"
}
interface RegimeAnalysis {
    regime: MarketRegime;
    confidence: number;
    trendStrength: number;
    volatility: number;
}
export declare class MarketRegimeService {
    private readonly logger;
    analyzeRegime(prices: number[], volume: number[], atr: number[]): RegimeAnalysis;
    private calculateTrendStrength;
    private calculateVolatility;
    private isNonTradingTime;
    shouldBlock(regime: MarketRegime): boolean;
}
export {};
