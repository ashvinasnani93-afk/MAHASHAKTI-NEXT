import { Injectable, Logger } from '@nestjs/common';
import { TechnicalEngineService } from './technical-engine.service';
import { MarketStructureService } from './market-structure.service';
import { MarketRegimeService, MarketRegime } from './market-regime.service';
import { SafetyLayerService } from './safety-layer.service';
import { PriceActionService } from './price-action.service';

export interface Signal {
  symbol: string;
  signal: 'STRONG BUY' | 'BUY' | 'SELL' | 'STRONG SELL' | 'WAIT';
  ltp: number;
  change: number;
  reason: string;
  timestamp: number;
  confidence: number;
  regime: string;
  safetyStatus: string;
  priceAction: string;
}

@Injectable()
export class SignalGeneratorService {
  private readonly logger = new Logger(SignalGeneratorService.name);

  constructor(
    private technicalEngineService: TechnicalEngineService,
    private marketStructureService: MarketStructureService,
    private marketRegimeService: MarketRegimeService,
    private safetyLayerService: SafetyLayerService,
    private priceActionService: PriceActionService,
  ) {}

  generateSignal(
    symbol: string,
    prices: number[],
    highs: number[],
    lows: number[],
    volume: number[],
    opens: number[],
    vix?: number,
  ): Signal {
    try {
      // STEP 1: Safety Layer Check
      const safetyCheck = this.safetyLayerService.checkSafety(symbol, vix);
      if (!safetyCheck.allowed) {
        return this.createBlockedSignal(symbol, prices, safetyCheck.reason);
      }

      // STEP 2: Market Regime Analysis
      const atr: number[] = []; // Mock ATR - calculate properly in production
      const regimeAnalysis = this.marketRegimeService.analyzeRegime(prices, volume, atr);

      // Block signals in NO_TRADE or HIGH_RISK regimes
      if (this.marketRegimeService.shouldBlock(regimeAnalysis.regime)) {
        return this.createBlockedSignal(
          symbol,
          prices,
          `Market regime: ${regimeAnalysis.regime}`,
        );
      }

      // STEP 3: Technical Indicators
      const indicators = this.technicalEngineService.calculateIndicators(prices);
      if (!indicators) {
        return this.waitSignal(symbol, prices, 'Insufficient data for analysis');
      }

      // STEP 4: Market Structure
      const structure = this.marketStructureService.analyzeStructure(highs, lows);

      // STEP 5: Price Action Analysis
      const currentCandle = this.priceActionService.analyzeCandle(
        opens[opens.length - 1],
        highs[highs.length - 1],
        lows[lows.length - 1],
        prices[prices.length - 1],
      );

      // STEP 6: Volume Confirmation (1.5x threshold)
      const avgVolume = volume.slice(-10).reduce((a, b) => a + b, 0) / 10;
      const currentVolume = volume[volume.length - 1];
      const volumeConfirmed = currentVolume > avgVolume * 1.5; // ✅ 1.5x threshold

      // STEP 7: Breakout/Breakdown Detection
      const resistance = Math.max(...highs.slice(-20));
      const support = Math.min(...lows.slice(-20));
      const breakoutCheck = this.priceActionService.detectBreakout(prices, volume, resistance);
      const breakdownCheck = this.priceActionService.detectBreakdown(prices, volume, support);

      // STEP 8: Calculate price change
      const currentPrice = prices[prices.length - 1];
      const previousPrice = prices[prices.length - 2] || currentPrice;
      const change = previousPrice ? ((currentPrice - previousPrice) / previousPrice) * 100 : 0;

      // STEP 9: Signal Generation Logic

      // === STRONG BUY CONDITIONS ===
      if (
        indicators.trend === 'UPTREND' &&
        structure.structure === 'BULLISH' &&
        indicators.macdSignal === 'BULLISH' &&
        !this.technicalEngineService.isOverbought(indicators.rsi) &&
        volumeConfirmed &&
        currentCandle.bullish &&
        currentCandle.strength === 'STRONG' &&
        regimeAnalysis.regime === MarketRegime.TRENDING_UP &&
        (!breakoutCheck.isBreakout || !breakoutCheck.isFake) // Ensure no fake breakout
      ) {
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

      // === STRONG SELL CONDITIONS ===
      if (
        indicators.trend === 'DOWNTREND' &&
        structure.structure === 'BEARISH' &&
        indicators.macdSignal === 'BEARISH' &&
        !this.technicalEngineService.isOversold(indicators.rsi) &&
        volumeConfirmed &&
        !currentCandle.bullish &&
        currentCandle.strength === 'STRONG' &&
        regimeAnalysis.regime === MarketRegime.TRENDING_DOWN &&
        (!breakdownCheck.isBreakdown || !breakdownCheck.isFake)
      ) {
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

      // === BUY CONDITIONS ===
      if (
        indicators.trend === 'UPTREND' &&
        indicators.macdSignal === 'BULLISH' &&
        !this.technicalEngineService.isOverbought(indicators.rsi) &&
        currentCandle.bullish
      ) {
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

      // === SELL CONDITIONS ===
      if (
        indicators.trend === 'DOWNTREND' &&
        indicators.macdSignal === 'BEARISH' &&
        !this.technicalEngineService.isOversold(indicators.rsi) &&
        !currentCandle.bullish
      ) {
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

      // === WAIT CONDITIONS ===
      // Sideways market
      if (regimeAnalysis.regime === MarketRegime.SIDEWAYS) {
        return this.waitSignal(
          symbol,
          prices,
          `Market in SIDEWAYS regime - Wait for clear trend`,
        );
      }

      // EMA compression
      if (indicators.trend === 'SIDEWAYS') {
        return this.waitSignal(symbol, prices, 'EMA compression detected - No clear trend');
      }

      // Overbought in uptrend
      if (
        indicators.trend === 'UPTREND' &&
        this.technicalEngineService.isOverbought(indicators.rsi)
      ) {
        return this.waitSignal(symbol, prices, 'Overbought (RSI ≥70) - Wait for pullback');
      }

      // Oversold in downtrend
      if (
        indicators.trend === 'DOWNTREND' &&
        this.technicalEngineService.isOversold(indicators.rsi)
      ) {
        return this.waitSignal(symbol, prices, 'Oversold (RSI ≤30) - Wait for bounce');
      }

      // Fake breakout detected
      if (breakoutCheck.isBreakout && breakoutCheck.isFake) {
        return this.waitSignal(symbol, prices, `Fake breakout detected: ${breakoutCheck.reason}`);
      }

      // Fake breakdown detected
      if (breakdownCheck.isBreakdown && breakdownCheck.isFake) {
        return this.waitSignal(
          symbol,
          prices,
          `Fake breakdown detected: ${breakdownCheck.reason}`,
        );
      }

      // Weak candle pattern
      if (currentCandle.type === 'DOJI' || currentCandle.type === 'REJECTION') {
        return this.waitSignal(symbol, prices, currentCandle.description);
      }

      // Default WAIT
      return this.waitSignal(symbol, prices, 'No clear signal - Conflicting indicators');
    } catch (error) {
      this.logger.error(`Error generating signal for ${symbol}: ${error.message}`);
      return this.waitSignal(symbol, prices, 'Error in signal generation');
    }
  }

  private waitSignal(symbol: string, prices: number[], reason: string): Signal {
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

  private createBlockedSignal(symbol: string, prices: number[], reason: string): Signal {
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
}
