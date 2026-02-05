"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var MarketRegimeService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.MarketRegimeService = exports.MarketRegime = void 0;
const common_1 = require("@nestjs/common");
var MarketRegime;
(function (MarketRegime) {
    MarketRegime["TRENDING_UP"] = "TRENDING_UP";
    MarketRegime["TRENDING_DOWN"] = "TRENDING_DOWN";
    MarketRegime["SIDEWAYS"] = "SIDEWAYS";
    MarketRegime["HIGH_RISK"] = "HIGH_RISK";
    MarketRegime["NO_TRADE"] = "NO_TRADE";
})(MarketRegime || (exports.MarketRegime = MarketRegime = {}));
let MarketRegimeService = MarketRegimeService_1 = class MarketRegimeService {
    constructor() {
        this.logger = new common_1.Logger(MarketRegimeService_1.name);
    }
    analyzeRegime(prices, volume, atr) {
        try {
            if (prices.length < 20) {
                return {
                    regime: MarketRegime.NO_TRADE,
                    confidence: 0,
                    trendStrength: 0,
                    volatility: 0,
                };
            }
            const trendStrength = this.calculateTrendStrength(prices);
            const volatility = this.calculateVolatility(prices, atr);
            let regime = MarketRegime.SIDEWAYS;
            let confidence = 0;
            if (volatility > 2.5) {
                regime = MarketRegime.HIGH_RISK;
                confidence = 0.9;
            }
            else if (trendStrength > 0.6) {
                regime = MarketRegime.TRENDING_UP;
                confidence = trendStrength;
            }
            else if (trendStrength < -0.6) {
                regime = MarketRegime.TRENDING_DOWN;
                confidence = Math.abs(trendStrength);
            }
            else if (Math.abs(trendStrength) < 0.3) {
                regime = MarketRegime.SIDEWAYS;
                confidence = 0.7;
            }
            else if (this.isNonTradingTime()) {
                regime = MarketRegime.NO_TRADE;
                confidence = 1.0;
            }
            return {
                regime,
                confidence,
                trendStrength,
                volatility,
            };
        }
        catch (error) {
            this.logger.error(`Error analyzing market regime: ${error.message}`);
            return {
                regime: MarketRegime.NO_TRADE,
                confidence: 0,
                trendStrength: 0,
                volatility: 0,
            };
        }
    }
    calculateTrendStrength(prices) {
        if (prices.length < 20)
            return 0;
        const n = prices.length;
        const x = Array.from({ length: n }, (_, i) => i);
        const y = prices;
        const sumX = x.reduce((a, b) => a + b, 0);
        const sumY = y.reduce((a, b) => a + b, 0);
        const sumXY = x.reduce((sum, xi, i) => sum + xi * y[i], 0);
        const sumX2 = x.reduce((sum, xi) => sum + xi * xi, 0);
        const slope = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
        const avgPrice = sumY / n;
        const normalizedSlope = slope / avgPrice;
        return Math.max(-1, Math.min(1, normalizedSlope * 100));
    }
    calculateVolatility(prices, atr) {
        if (atr.length === 0) {
            const mean = prices.reduce((a, b) => a + b, 0) / prices.length;
            const variance = prices.reduce((sum, price) => sum + Math.pow(price - mean, 2), 0) / prices.length;
            const stdDev = Math.sqrt(variance);
            return (stdDev / mean) * 100;
        }
        const currentATR = atr[atr.length - 1];
        const avgATR = atr.reduce((a, b) => a + b, 0) / atr.length;
        return currentATR / avgATR;
    }
    isNonTradingTime() {
        const now = new Date();
        const day = now.getDay();
        const hours = now.getHours();
        if (day === 0 || day === 6)
            return true;
        if (hours < 9 || hours >= 16)
            return true;
        return false;
    }
    shouldBlock(regime) {
        return regime === MarketRegime.HIGH_RISK || regime === MarketRegime.NO_TRADE;
    }
};
exports.MarketRegimeService = MarketRegimeService;
exports.MarketRegimeService = MarketRegimeService = MarketRegimeService_1 = __decorate([
    (0, common_1.Injectable)()
], MarketRegimeService);
//# sourceMappingURL=market-regime.service.js.map