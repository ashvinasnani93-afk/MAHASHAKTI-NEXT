"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var TechnicalEngineService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TechnicalEngineService = void 0;
const common_1 = require("@nestjs/common");
const technicalindicators_1 = require("technicalindicators");
let TechnicalEngineService = TechnicalEngineService_1 = class TechnicalEngineService {
    constructor() {
        this.logger = new common_1.Logger(TechnicalEngineService_1.name);
    }
    calculateIndicators(prices) {
        try {
            if (prices.length < 50) {
                return null;
            }
            const ema20Array = technicalindicators_1.EMA.calculate({ period: 20, values: prices });
            const ema20 = ema20Array[ema20Array.length - 1];
            const ema50Array = technicalindicators_1.EMA.calculate({ period: 50, values: prices });
            const ema50 = ema50Array[ema50Array.length - 1];
            const rsiArray = technicalindicators_1.RSI.calculate({ period: 14, values: prices });
            const rsi = rsiArray[rsiArray.length - 1];
            const currentPrice = prices[prices.length - 1];
            let trend = 'SIDEWAYS';
            if (currentPrice > ema20 && ema20 > ema50) {
                trend = 'UPTREND';
            }
            else if (currentPrice < ema20 && ema20 < ema50) {
                trend = 'DOWNTREND';
            }
            const macdInput = {
                values: prices,
                fastPeriod: 12,
                slowPeriod: 26,
                signalPeriod: 9,
                SimpleMAOscillator: false,
                SimpleMASignal: false,
            };
            const macdArray = technicalindicators_1.MACD.calculate(macdInput);
            const macd = macdArray[macdArray.length - 1];
            let macdSignal = 'NEUTRAL';
            if (macd && macd.MACD > macd.signal) {
                macdSignal = 'BULLISH';
            }
            else if (macd && macd.MACD < macd.signal) {
                macdSignal = 'BEARISH';
            }
            return {
                ema20,
                ema50,
                rsi,
                macdSignal,
                trend,
            };
        }
        catch (error) {
            this.logger.error(`Error calculating indicators: ${error.message}`);
            return null;
        }
    }
    isOverbought(rsi) {
        return rsi >= 70;
    }
    isOversold(rsi) {
        return rsi <= 30;
    }
};
exports.TechnicalEngineService = TechnicalEngineService;
exports.TechnicalEngineService = TechnicalEngineService = TechnicalEngineService_1 = __decorate([
    (0, common_1.Injectable)()
], TechnicalEngineService);
//# sourceMappingURL=technical-engine.service.js.map