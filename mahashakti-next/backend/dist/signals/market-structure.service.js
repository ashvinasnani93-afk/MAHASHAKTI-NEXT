"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var MarketStructureService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.MarketStructureService = void 0;
const common_1 = require("@nestjs/common");
let MarketStructureService = MarketStructureService_1 = class MarketStructureService {
    constructor() {
        this.logger = new common_1.Logger(MarketStructureService_1.name);
    }
    analyzeStructure(highs, lows) {
        if (highs.length < 3 || lows.length < 3) {
            return {
                structure: 'SIDEWAYS',
                higherHigh: false,
                higherLow: false,
                lowerHigh: false,
                lowerLow: false,
            };
        }
        const recentHighs = highs.slice(-3);
        const recentLows = lows.slice(-3);
        const higherHigh = recentHighs[2] > recentHighs[1] && recentHighs[1] > recentHighs[0];
        const higherLow = recentLows[2] > recentLows[1] && recentLows[1] > recentLows[0];
        const lowerHigh = recentHighs[2] < recentHighs[1] && recentHighs[1] < recentHighs[0];
        const lowerLow = recentLows[2] < recentLows[1] && recentLows[1] < recentLows[0];
        let structure = 'SIDEWAYS';
        if (higherHigh && higherLow) {
            structure = 'BULLISH';
        }
        else if (lowerHigh && lowerLow) {
            structure = 'BEARISH';
        }
        return {
            structure,
            higherHigh,
            higherLow,
            lowerHigh,
            lowerLow,
        };
    }
};
exports.MarketStructureService = MarketStructureService;
exports.MarketStructureService = MarketStructureService = MarketStructureService_1 = __decorate([
    (0, common_1.Injectable)()
], MarketStructureService);
//# sourceMappingURL=market-structure.service.js.map