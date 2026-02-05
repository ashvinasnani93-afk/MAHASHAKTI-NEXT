import { AngelOneService } from '../angel-one/angel-one.service';
import { ConfigService } from '../config/config.service';
interface FilteredStrike {
    symbol: string;
    token: string;
    strike: number;
    optionType: string;
}
export declare class StrikeFilterService {
    private angelOneService;
    private configService;
    private readonly logger;
    constructor(angelOneService: AngelOneService, configService: ConfigService);
    filterStrikes(underlying: string, allStrikes: any[]): Promise<FilteredStrike[]>;
    private getATM;
}
export {};
