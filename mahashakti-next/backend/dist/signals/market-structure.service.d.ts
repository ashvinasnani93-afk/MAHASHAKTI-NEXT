interface MarketStructure {
    structure: string;
    higherHigh: boolean;
    higherLow: boolean;
    lowerHigh: boolean;
    lowerLow: boolean;
}
export declare class MarketStructureService {
    private readonly logger;
    analyzeStructure(highs: number[], lows: number[]): MarketStructure;
}
export {};
