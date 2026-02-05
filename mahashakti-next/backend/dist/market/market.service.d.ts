import { AngelOneService } from '../angel-one/angel-one.service';
import { SymbolMasterService } from '../angel-one/symbol-master.service';
export declare class MarketService {
    private angelOneService;
    private symbolMasterService;
    private readonly logger;
    constructor(angelOneService: AngelOneService, symbolMasterService: SymbolMasterService);
    getDashboardData(): Promise<{
        indices: {
            symbol: string;
            name: string;
            ltp: number;
            change: number;
            changePercent: number;
        }[];
        topGainers: {
            symbol: string;
            ltp: number;
            change: number;
            changePercent: number;
        }[];
        topLosers: {
            symbol: string;
            ltp: number;
            change: number;
            changePercent: number;
        }[];
        upcomingIPOs: {
            name: string;
            openDate: string;
            closeDate: string;
            priceRange: string;
            gmp: number;
            gmpPercent: number;
        }[];
    }>;
    getBigMovers(minChange?: number, maxChange?: number): Promise<{
        symbol: string;
        name: string;
        ltp: number;
        prevClose: number;
        change: number;
        changePercent: number;
        volume: number;
        signal: string;
        reason: string;
    }[]>;
    getStocksByCategory(category: string): Promise<{
        symbol: string;
        ltp: number;
        change: number;
        changePercent: number;
        volume: number;
    }[]>;
    getSymbolDetail(symbol: string): Promise<{
        symbol: string;
        name: string;
        ltp: number;
        open: number;
        high: number;
        low: number;
        prevClose: number;
        volume: number;
        change: number;
        changePercent: number;
        avgTradePrice: number;
        hasOptions: boolean;
    }>;
    getCommodities(): Promise<{
        symbol: string;
        name: string;
        ltp: number;
        change: number;
        changePercent: number;
    }[]>;
    searchSymbols(query: string): Promise<{
        symbol: string;
        name: string;
        type: string;
    }[]>;
}
