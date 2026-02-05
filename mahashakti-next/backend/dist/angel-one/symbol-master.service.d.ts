interface OptionContract {
    symbol: string;
    name: string;
    token: string;
    exchange: string;
    strike: number;
    optionType: string;
    expiry: string;
    expiryDate: string;
    lotSize: number;
}
export declare class SymbolMasterService {
    private readonly logger;
    private symbolsData;
    private fnoSymbols;
    loadSymbolMaster(): Promise<boolean>;
    getFnoStocks(): string[];
    getOptionContracts(underlying: string, weekly?: boolean, monthly?: boolean): OptionContract[];
    getAllIndexOptions(): OptionContract[];
    getToken(symbol: string, exchange?: string): string | null;
    private parseExpiry;
    private getWeekEnd;
    private getMonthEnd;
}
export {};
