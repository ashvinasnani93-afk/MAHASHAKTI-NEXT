"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var StrikeFilterService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.StrikeFilterService = void 0;
const common_1 = require("@nestjs/common");
const angel_one_service_1 = require("../angel-one/angel-one.service");
const config_service_1 = require("../config/config.service");
let StrikeFilterService = StrikeFilterService_1 = class StrikeFilterService {
    constructor(angelOneService, configService) {
        this.angelOneService = angelOneService;
        this.configService = configService;
        this.logger = new common_1.Logger(StrikeFilterService_1.name);
    }
    async filterStrikes(underlying, allStrikes) {
        try {
            const atmStrike = await this.getATM(underlying);
            if (!atmStrike) {
                return [];
            }
            const range = this.configService.getStrikeRange(underlying);
            const uniqueStrikes = new Set();
            allStrikes.forEach((strike) => uniqueStrikes.add(strike.strike));
            const sortedStrikes = Array.from(uniqueStrikes).sort((a, b) => a - b);
            let atmIndex = 0;
            for (let i = 0; i < sortedStrikes.length; i++) {
                if (sortedStrikes[i] >= atmStrike) {
                    atmIndex = i;
                    break;
                }
            }
            const startIndex = Math.max(0, atmIndex - range);
            const endIndex = Math.min(sortedStrikes.length - 1, atmIndex + range);
            const relevantStrikes = sortedStrikes.slice(startIndex, endIndex + 1);
            const filtered = allStrikes.filter((strike) => relevantStrikes.includes(strike.strike));
            this.logger.log(`✅ Filtered ${filtered.length} strikes for ${underlying} (ATM: ${atmStrike}, Range: ±${range})`);
            return filtered.map((s) => ({
                symbol: s.symbol,
                token: s.token,
                strike: s.strike,
                optionType: s.optionType,
            }));
        }
        catch (error) {
            this.logger.error(`Error filtering strikes: ${error.message}`);
            return [];
        }
    }
    async getATM(underlying) {
        try {
            const mockPrices = {
                NIFTY: 23500,
                BANKNIFTY: 51000,
                FINNIFTY: 22500,
            };
            return mockPrices[underlying] || 1000;
        }
        catch (error) {
            this.logger.error(`Error getting ATM: ${error.message}`);
            return null;
        }
    }
};
exports.StrikeFilterService = StrikeFilterService;
exports.StrikeFilterService = StrikeFilterService = StrikeFilterService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [angel_one_service_1.AngelOneService,
        config_service_1.ConfigService])
], StrikeFilterService);
//# sourceMappingURL=strike-filter.service.js.map