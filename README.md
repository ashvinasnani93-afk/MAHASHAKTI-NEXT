# 🚀 Mahashakti Market Pro

**Enterprise-grade Stock Market Trading Platform with Real-time Option Scanner & Advanced Signal Engine**

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![Backend](https://img.shields.io/badge/backend-NestJS_TypeScript-red)
![Frontend](https://img.shields.io/badge/frontend-React.js-cyan)
![License](https://img.shields.io/badge/license-MIT-green)

---

## 📖 Overview

Mahashakti Market Pro is a comprehensive stock market analysis platform featuring:
- **Real-time Option Explosion Scanner** - Detects sudden explosive moves in option contracts
- **Advanced Signal Engine** - Institutional-grade BUY/SELL/STRONG BUY/STRONG SELL signals
- **Angel One Integration** - Live market data via SmartAPI
- **9 Screens** - Dashboard, Signals, Scanner, Options, Movers, Commodities, Heatmap, Details, Settings

---

## ✨ Key Features

### 🎯 Advanced Signal Engine (All 9 Features)
1. ✅ **All 5 Signal Types** - STRONG_BUY, BUY, WAIT, SELL, STRONG_SELL
2. ✅ **EMA 20/50 Trend Filter** - Uptrend/Downtrend/Compression detection
3. ✅ **RSI Sanity Check** - Overbought (≥70) & Oversold (≤30) filtering
4. ✅ **Volume Confirmation** - 1.5x average volume threshold
5. ✅ **Market Structure** - HH/HL (Bullish) vs LH/LL (Bearish) analysis
6. ✅ **Breakout/Breakdown Detection** - Real vs Fake signal distinction
7. ✅ **Market Regime States** - TRENDING_UP/DOWN/SIDEWAYS/HIGH_RISK/NO_TRADE
8. ✅ **Safety Layer** - Expiry/Result/Weekend/VIX>25/After-hours blocks
9. ✅ **Price Action** - Candle psychology (Doji, Hammer, Shooting Star, etc.)

### 🔥 Option Explosion Scanner
- Monitors NIFTY, BANKNIFTY, FINNIFTY + All F&O stocks
- Detects 40% price jumps, 5x volume spikes, 15% OI changes
- Real-time WebSocket alerts
- Smart money entry detection

---

## 🚀 Quick Start

```bash
# Clone repository
git clone https://github.com/ashvinasnani93-afk/MAHSHAKTI-MARKET-PRO.git
cd MAHSHAKTI-MARKET-PRO

# Backend setup
cd backend-node
npm install
npm run start:dev

# Frontend setup
cd ../frontend
yarn install
yarn start
```

---

## 📚 Documentation

See `/docs` folder for detailed documentation:
- MAHASHAKTI_DEPLOYMENT.md
- FILE_STRUCTURE_COMPLETE.md
- ADVANCED_SIGNAL_ENGINE_COMPLETE.md

---

**Built with ❤️ by Mahashakti Team**
