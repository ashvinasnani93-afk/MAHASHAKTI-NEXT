import { MarketService } from './market.service';
export declare class MarketController {
    private marketService;
    constructor(marketService: MarketService);
    getDashboard(): Promise<{
        success: boolean;
        data: {
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
        };
    }>;
    getStocks(category: string): Promise<{
        success: boolean;
        data: {
            symbol: string;
            ltp: number;
            change: number;
            changePercent: number;
            volume: number;
        }[];
    }>;
    getMovers(minChange: string, maxChange: string): Promise<{
        success: boolean;
        data: {
            symbol: string;
            name: string;
            ltp: number;
            prevClose: number;
            change: number;
            changePercent: number;
            volume: number;
            signal: string;
            reason: string;
        }[];
    }>;
    getSymbolDetail(symbol: string): Promise<{
        success: boolean;
        data: {
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
        };
    }>;
    getCommodities(): Promise<{
        success: boolean;
        data: {
            symbol: string;
            name: string;
            ltp: number;
            change: number;
            changePercent: number;
        }[];
    }>;
    search(query: string): Promise<{
        success: boolean;
        data: {
            symbol: string;
            name: string;
            type: string;
        }[];
    }>;
}
