import { ConfigService } from '../config/config.service';
export declare class AngelOneService {
    private configService;
    private readonly logger;
    private smartApi;
    private authToken;
    private refreshToken;
    private feedToken;
    private isLoggedIn;
    constructor(configService: ConfigService);
    login(): Promise<boolean>;
    getProfile(): Promise<any>;
    getLTP(exchange: string, tradingSymbol: string, symbolToken: string): Promise<any>;
    getMarketData(mode: string, exchangeTokens: any): Promise<any>;
    getFeedToken(): string;
    getSmartApi(): any;
    isAuthenticated(): boolean;
}
