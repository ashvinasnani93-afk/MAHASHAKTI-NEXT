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
var SignalGeneratorService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignalGeneratorService = void 0;
const common_1 = require("@nestjs/common");
const technical_engine_service_1 = require("./technical-engine.service");
const market_structure_service_1 = require("./market-structure.service");
const market_regime_service_1 = require("./market-regime.service");
const safety_layer_service_1 = require("./safety-layer.service");
const price_action_service_1 = require("./price-action.service");
let SignalGeneratorService = SignalGeneratorService_1 = class SignalGeneratorService {
    constructor(technicalEngineService, marketStructureService, marketRegimeService, safetyLayerService, priceActionService) {
        this.technicalEngineService = technicalEngineService;
        this.marketStructureService = marketStructureService;
        this.marketRegimeService = marketRegimeService;
        this.safetyLayerService = safetyLayerService;
        this.priceActionService = priceActionService;
        this.logger = new common_1.Logger(SignalGeneratorService_1.name);
    }
    generateSignal(symbol, prices, highs, lows, volume, opens, vix) {
        try {
            const safetyCheck = this.safetyLayerService.checkSafety(symbol, vix);
            if (!safetyCheck.allowed) {
                return this.createBlockedSignal(symbol, prices, safetyCheck.reason);
            }
            const atr = [];
            const regimeAnalysis = this.marketRegimeService.analyzeRegime(prices, volume, atr);
            if (this.marketRegimeService.shouldBlock(regimeAnalysis.regime)) {
                return this.createBlockedSignal(symbol, prices, `Market regime: ${regimeAnalysis.regime}`);
            }
            const indicators = this.technicalEngineService.calculateIndicators(prices);
            if (!indicators) {
                return this.waitSignal(symbol, prices, 'Insufficient data for analysis');
            }
            const structure = this.marketStructureService.analyzeStructure(highs, lows);
            const currentCandle = this.priceActionService.analyzeCandle(opens[opens.length - 1], highs[highs.length - 1], lows[lows.length - 1], prices[prices.length - 1]);
            const avgVolume = volume.slice(-10).reduce((a, b) => a + b, 0) / 10;
            const currentVolume = volume[volume.length - 1];
            const volumeConfirmed = currentVolume > avgVolume * 1.5;
            const resistance = Math.max(...highs.slice(-20));
            const support = Math.min(...lows.slice(-20));
            const breakoutCheck = this.priceActionService.detectBreakout(prices, volume, resistance);
            const breakdownCheck = this.priceActionService.detectBreakdown(prices, volume, support);
            const currentPrice = prices[prices.length - 1];
            const previousPrice = prices[prices.length - 2] || currentPrice;
            const change = previousPrice ? ((currentPrice - previousPrice) / previousPrice) * 100 : 0;
            if (indicators.trend === 'UPTREND' &&
                structure.structure === 'BULLISH' &&
                indicators.macdSignal === 'BULLISH' &&
                !this.technicalEngineService.isOverbought(indicators.rsi) &&
                volumeConfirmed &&
                currentCandle.bullish &&
                currentCandle.strength === 'STRONG' &&
                regimeAnalysis.regime === market_regime_service_1.MarketRegime.TRENDING_UP &&
                (!breakoutCheck.isBreakout || !breakoutCheck.isFake)) {
                return {
                    symbol,
                    signal: 'STRONG BUY',
                    ltp: currentPrice,
                    change,
                    reason: `Strong uptrend with all confirmations: Bullish structure, MACD bullish, Strong ${currentCandle.type} candle, Volume 1.5x confirmed, Market regime: ${regimeAnalysis.regime}`,
                    timestamp: Date.now(),
                    confidence: regimeAnalysis.confidence,
                    regime: regimeAnalysis.regime,
                    safetyStatus: 'PASSED',
                    priceAction: currentCandle.description,
                };
            }
            if (indicators.trend === 'DOWNTREND' &&
                structure.structure === 'BEARISH' &&
                indicators.macdSignal === 'BEARISH' &&
                !this.technicalEngineService.isOversold(indicators.rsi) &&
                volumeConfirmed &&
                !currentCandle.bullish &&
                currentCandle.strength === 'STRONG' &&
                regimeAnalysis.regime === market_regime_service_1.MarketRegime.TRENDING_DOWN &&
                (!breakdownCheck.isBreakdown || !breakdownCheck.isFake)) {
                return {
                    symbol,
                    signal: 'STRONG SELL',
                    ltp: currentPrice,
                    change,
                    reason: `Strong downtrend with all confirmations: Bearish structure, MACD bearish, Strong ${currentCandle.type} candle, Volume 1.5x confirmed, Market regime: ${regimeAnalysis.regime}`,
                    timestamp: Date.now(),
                    confidence: regimeAnalysis.confidence,
                    regime: regimeAnalysis.regime,
                    safetyStatus: 'PASSED',
                    priceAction: currentCandle.description,
                };
            }
            if (indicators.trend === 'UPTREND' &&
                indicators.macdSignal === 'BULLISH' &&
                !this.technicalEngineService.isOverbought(indicators.rsi) &&
                currentCandle.bullish) {
                return {
                    symbol,
                    signal: 'BUY',
                    ltp: currentPrice,
                    change,
                    reason: `Uptrend with bullish MACD, ${currentCandle.type} candle pattern`,
                    timestamp: Date.now(),
                    confidence: regimeAnalysis.confidence * 0.8,
                    regime: regimeAnalysis.regime,
                    safetyStatus: 'PASSED',
                    priceAction: currentCandle.description,
                };
            }
            if (indicators.trend === 'DOWNTREND' &&
                indicators.macdSignal === 'BEARISH' &&
                !this.technicalEngineService.isOversold(indicators.rsi) &&
                !currentCandle.bullish) {
                return {
                    symbol,
                    signal: 'SELL',
                    ltp: currentPrice,
                    change,
                    reason: `Downtrend with bearish MACD, ${currentCandle.type} candle pattern`,
                    timestamp: Date.now(),
                    confidence: regimeAnalysis.confidence * 0.8,
                    regime: regimeAnalysis.regime,
                    safetyStatus: 'PASSED',
                    priceAction: currentCandle.description,
                };
            }
            if (regimeAnalysis.regime === market_regime_service_1.MarketRegime.SIDEWAYS) {
                return this.waitSignal(symbol, prices, `Market in SIDEWAYS regime - Wait for clear trend`);
            }
            if (indicators.trend === 'SIDEWAYS') {
                return this.waitSignal(symbol, prices, 'EMA compression detected - No clear trend');
            }
            if (indicators.trend === 'UPTREND' &&
                this.technicalEngineService.isOverbought(indicators.rsi)) {
                return this.waitSignal(symbol, prices, 'Overbought (RSI ≥70) - Wait for pullback');
            }
            if (indicators.trend === 'DOWNTREND' &&
                this.technicalEngineService.isOversold(indicators.rsi)) {
                return this.waitSignal(symbol, prices, 'Oversold (RSI ≤30) - Wait for bounce');
            }
            if (breakoutCheck.isBreakout && breakoutCheck.isFake) {
                return this.waitSignal(symbol, prices, `Fake breakout detected: ${breakoutCheck.reason}`);
            }
            if (breakdownCheck.isBreakdown && breakdownCheck.isFake) {
                return this.waitSignal(symbol, prices, `Fake breakdown detected: ${breakdownCheck.reason}`);
            }
            if (currentCandle.type === 'DOJI' || currentCandle.type === 'REJECTION') {
                return this.waitSignal(symbol, prices, currentCandle.description);
            }
            return this.waitSignal(symbol, prices, 'No clear signal - Conflicting indicators');
        }
        catch (error) {
            this.logger.error(`Error generating signal for ${symbol}: ${error.message}`);
            return this.waitSignal(symbol, prices, 'Error in signal generation');
        }
    }
    waitSignal(symbol, prices, reason) {
        const currentPrice = prices[prices.length - 1];
        const previousPrice = prices[prices.length - 2] || currentPrice;
        const change = previousPrice ? ((currentPrice - previousPrice) / previousPrice) * 100 : 0;
        return {
            symbol,
            signal: 'WAIT',
            ltp: currentPrice,
            change,
            reason,
            timestamp: Date.now(),
            confidence: 0,
            regime: 'UNKNOWN',
            safetyStatus: 'PASSED',
            priceAction: 'N/A',
        };
    }
    createBlockedSignal(symbol, prices, reason) {
        const currentPrice = prices[prices.length - 1] || 0;
        const previousPrice = prices[prices.length - 2] || currentPrice;
        const change = previousPrice ? ((currentPrice - previousPrice) / previousPrice) * 100 : 0;
        return {
            symbol,
            signal: 'WAIT',
            ltp: currentPrice,
            change,
            reason: `BLOCKED: ${reason}`,
            timestamp: Date.now(),
            confidence: 0,
            regime: 'BLOCKED',
            safetyStatus: 'BLOCKED',
            priceAction: 'N/A',
        };
    }
};
exports.SignalGeneratorService = SignalGeneratorService;
exports.SignalGeneratorService = SignalGeneratorService = SignalGeneratorService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [technical_engine_service_1.TechnicalEngineService,
        market_structure_service_1.MarketStructureService,
        market_regime_service_1.MarketRegimeService,
        safety_layer_service_1.SafetyLayerService,
        price_action_service_1.PriceActionService])
], SignalGeneratorService);
//# sourceMappingURL=signal-generator.service.js.map