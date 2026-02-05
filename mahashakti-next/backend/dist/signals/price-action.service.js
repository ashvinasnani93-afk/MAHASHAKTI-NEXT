"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var PriceActionService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PriceActionService = void 0;
const common_1 = require("@nestjs/common");
let PriceActionService = PriceActionService_1 = class PriceActionService {
    constructor() {
        this.logger = new common_1.Logger(PriceActionService_1.name);
    }
    analyzeCandle(open, high, low, close) {
        const body = Math.abs(close - open);
        const range = high - low;
        const upperWick = high - Math.max(open, close);
        const lowerWick = Math.min(open, close) - low;
        const bodyRatio = body / range;
        const upperWickRatio = upperWick / range;
        const lowerWickRatio = lowerWick / range;
        if (bodyRatio < 0.1) {
            return {
                type: 'DOJI',
                strength: 'WEAK',
                bullish: false,
                description: 'Indecision candle - Wait for confirmation',
            };
        }
        if (close > open && lowerWickRatio > 0.6 && upperWickRatio < 0.1) {
            return {
                type: 'HAMMER',
                strength: 'STRONG',
                bullish: true,
                description: 'Bullish hammer - Strong buying pressure at lows',
            };
        }
        if (close < open && upperWickRatio > 0.6 && lowerWickRatio < 0.1) {
            return {
                type: 'SHOOTING_STAR',
                strength: 'STRONG',
                bullish: false,
                description: 'Shooting star - Strong selling pressure at highs',
            };
        }
        if (close > open && bodyRatio > 0.7) {
            return {
                type: 'STRONG_BULLISH',
                strength: 'STRONG',
                bullish: true,
                description: 'Strong bullish candle - Big body, small wicks',
            };
        }
        if (close < open && bodyRatio > 0.7) {
            return {
                type: 'STRONG_BEARISH',
                strength: 'STRONG',
                bullish: false,
                description: 'Strong bearish candle - Big body, small wicks',
            };
        }
        if (upperWickRatio > 0.5 || lowerWickRatio > 0.5) {
            return {
                type: 'REJECTION',
                strength: 'MEDIUM',
                bullish: false,
                description: 'Rejection candle - Long wicks indicate resistance',
            };
        }
        return {
            type: 'NEUTRAL',
            strength: 'MEDIUM',
            bullish: close > open,
            description: 'Normal candle - No strong pattern',
        };
    }
    detectBreakout(prices, volumes, resistanceLevel) {
        if (prices.length < 2 || volumes.length < 2) {
            return { isBreakout: false, isFake: false, reason: 'Insufficient data' };
        }
        const currentPrice = prices[prices.length - 1];
        const previousPrice = prices[prices.length - 2];
        const currentVolume = volumes[volumes.length - 1];
        const avgVolume = volumes.slice(-10).reduce((a, b) => a + b, 0) / 10;
        if (currentPrice > resistanceLevel && previousPrice <= resistanceLevel) {
            if (currentVolume > avgVolume * 1.5) {
                return {
                    isBreakout: true,
                    isFake: false,
                    reason: 'Real breakout with volume confirmation',
                };
            }
            else {
                return {
                    isBreakout: true,
                    isFake: true,
                    reason: 'Fake breakout - Low volume',
                };
            }
        }
        return { isBreakout: false, isFake: false, reason: 'No breakout detected' };
    }
    detectBreakdown(prices, volumes, supportLevel) {
        if (prices.length < 2 || volumes.length < 2) {
            return { isBreakdown: false, isFake: false, reason: 'Insufficient data' };
        }
        const currentPrice = prices[prices.length - 1];
        const previousPrice = prices[prices.length - 2];
        const currentVolume = volumes[volumes.length - 1];
        const avgVolume = volumes.slice(-10).reduce((a, b) => a + b, 0) / 10;
        if (currentPrice < supportLevel && previousPrice >= supportLevel) {
            if (currentVolume > avgVolume * 1.5) {
                return {
                    isBreakdown: true,
                    isFake: false,
                    reason: 'Real breakdown with volume confirmation',
                };
            }
            else {
                return {
                    isBreakdown: true,
                    isFake: true,
                    reason: 'Fake breakdown - Low volume',
                };
            }
        }
        return { isBreakdown: false, isFake: false, reason: 'No breakdown detected' };
    }
};
exports.PriceActionService = PriceActionService;
exports.PriceActionService = PriceActionService = PriceActionService_1 = __decorate([
    (0, common_1.Injectable)()
], PriceActionService);
//# sourceMappingURL=price-action.service.js.map