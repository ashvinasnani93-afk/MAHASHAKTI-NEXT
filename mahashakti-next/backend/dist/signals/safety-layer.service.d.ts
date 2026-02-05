interface SafetyCheck {
    allowed: boolean;
    reason: string;
    blockedBy: string[];
}
export declare class SafetyLayerService {
    private readonly logger;
    checkSafety(symbol: string, vix?: number): SafetyCheck;
    private isExpiryDay;
    private getLastThursday;
    private isResultDay;
    private isWeekend;
    private isMarketHours;
    isHighRiskPeriod(): boolean;
}
export {};
