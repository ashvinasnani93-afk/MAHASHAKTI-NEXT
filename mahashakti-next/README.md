# 🚀 Mahashakti NEXT

**Next-Generation Stock Market Trading Platform**  
*NestJS + TypeScript + React.js Architecture*

![Version](https://img.shields.io/badge/version-2.0.0-blue)
![Backend](https://img.shields.io/badge/backend-NestJS_TypeScript-red)
![Frontend](https://img.shields.io/badge/frontend-React.js-cyan)
![Database](https://img.shields.io/badge/database-MongoDB-green)

---

## 📖 Overview

**Mahashakti NEXT** is the modern TypeScript rewrite of Mahashakti Market Pro, featuring:
- ✅ **Full TypeScript** - Type-safe backend & frontend
- ✅ **NestJS Architecture** - Modular, scalable, enterprise-grade
- ✅ **Advanced Signal Engine** - 9 institutional-level features
- ✅ **Real-time Scanner** - Option explosion detection
- ✅ **Angel One Integration** - Live market data via SmartAPI
- ✅ **9 Complete Screens** - Production-ready UI

---

## ⚡ Why NEXT?

| Feature | Legacy (Python) | NEXT (NestJS) |
|---------|----------------|---------------|
| **Type Safety** | ❌ Dynamic | ✅ Full TypeScript |
| **Architecture** | ❌ Monolithic | ✅ Modular (NestJS) |
| **Scalability** | ⚠️ Limited | ✅ Enterprise-grade |
| **WebSocket** | ⚠️ Basic | ✅ Socket.IO with Gateway |
| **Testing** | ❌ Minimal | ✅ Jest + E2E ready |
| **Dependency Injection** | ❌ No | ✅ Native NestJS DI |
| **Documentation** | ⚠️ Basic | ✅ Comprehensive |

---

## ✨ Features

### 🎯 Advanced Signal Engine (All 9 Features)
1. ✅ **5 Signal Types** - STRONG_BUY, BUY, WAIT, SELL, STRONG_SELL
2. ✅ **EMA 20/50 Trend** - UPTREND/DOWNTREND/COMPRESSION
3. ✅ **RSI Sanity** - Overbought/Oversold filtering
4. ✅ **Volume 1.5x** - Average volume confirmation
5. ✅ **Market Structure** - HH/HL vs LH/LL analysis
6. ✅ **Breakout Detection** - Real vs Fake distinction
7. ✅ **Market Regimes** - 5 states (TRENDING/SIDEWAYS/HIGH_RISK/NO_TRADE)
8. ✅ **Safety Layer** - Expiry/Result/Weekend/VIX/Hours blocks
9. ✅ **Price Action** - 7 candle patterns (Doji, Hammer, etc.)

### 🔥 Option Explosion Scanner
- **Coverage**: NIFTY, BANKNIFTY, FINNIFTY + All F&O stocks
- **Detection**: 40% price jump, 5x volume spike, 15% OI change, 10% IV change
- **Alerts**: Real-time WebSocket push notifications
- **Scoring**: 9-point system with 8+ threshold
- **Frequency**: Scans every 2 seconds

### 📊 Market Coverage
- **Indices**: NIFTY, BANKNIFTY, FINNIFTY
- **Options**: Current week + current month expiry
- **Stocks**: Top 100 F&O liquid stocks
- **Commodities**: Gold, Silver, Crude Oil, Natural Gas
- **Movers**: 15-20% daily movement stocks

---

## 🏗️ Architecture

```
mahashakti-next/
├── backend/               # NestJS Backend (TypeScript)
│   ├── src/
│   │   ├── main.ts       # Entry point with CORS & WebSocket
│   │   ├── app.module.ts # Root module
│   │   ├── config/       # ConfigService (environment variables)
│   │   ├── database/     # MongoDB connection
│   │   ├── angel-one/    # SmartAPI integration
│   │   │   ├── angel-one.service.ts
│   │   │   ├── symbol-master.service.ts
│   │   │   └── websocket-stream.service.ts
│   │   ├── scanner/      # Option Explosion Scanner
│   │   │   ├── explosion-detector.service.ts
│   │   │   ├── option-cache.service.ts
│   │   │   └── scanner.gateway.ts
│   │   ├── signals/      # Advanced Signal Engine
│   │   │   ├── signal-generator.service.ts
│   │   │   ├── technical-engine.service.ts
│   │   │   ├── market-regime.service.ts
│   │   │   ├── safety-layer.service.ts
│   │   │   └── price-action.service.ts
│   │   └── market/       # Market Data APIs
│   ├── .env
│   └── package.json
│
├── frontend/             # React.js Frontend
│   ├── src/
│   │   ├── App.js
│   │   ├── services/     # API & WebSocket clients
│   │   ├── components/   # UI components
│   │   └── screens/      # 9 application screens
│   ├── .env
│   └── package.json
│
└── docs/                 # Documentation
    ├── MAHASHAKTI_DEPLOYMENT.md
    ├── FILE_STRUCTURE_COMPLETE.md
    └── ADVANCED_SIGNAL_ENGINE_COMPLETE.md
```

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- MongoDB running
- Angel One account with API credentials

### 1. Clone Repository
```bash
git clone https://github.com/ashvinasnani93-afk/MAHASHAKTI-NEXT.git
cd MAHASHAKTI-NEXT
```

### 2. Backend Setup
```bash
cd backend

# Install dependencies
npm install

# Configure .env
cp .env.example .env
# Add your Angel One credentials

# Build
npm run build

# Start development
npm run start:dev

# Backend runs on http://localhost:3000
```

### 3. Frontend Setup
```bash
cd frontend

# Install dependencies
yarn install

# Configure .env
cp .env.example .env
# Set REACT_APP_BACKEND_URL=http://localhost:3000

# Start development
yarn start

# Frontend runs on http://localhost:3001
```

---

## 🔑 Environment Variables

### Backend (.env)
```env
# Angel One Credentials
ANGEL_API_KEY=your_api_key
ANGEL_CLIENT_ID=your_client_id
ANGEL_PASSWORD=your_password
ANGEL_TOTP_SECRET=your_totp_secret

# Database
MONGO_URL=mongodb://localhost:27017
DB_NAME=mahashakti_next_db

# Server
PORT=3000
CORS_ORIGINS=*

# Scanner Config
SCANNER_INTERVAL=2000
CACHE_DURATION=300000
VIX_THRESHOLD=25
EXPLOSION_PRICE_CHANGE=40
EXPLOSION_VOLUME_SPIKE=5
EXPLOSION_OI_CHANGE=15
EXPLOSION_IV_CHANGE=10
EXPLOSION_SCORE_THRESHOLD=8
```

### Frontend (.env)
```env
REACT_APP_BACKEND_URL=http://localhost:3000
```

---

## 📡 API Endpoints

### Market APIs
```
GET  /api/market/dashboard
GET  /api/market/stocks?category=gainers
GET  /api/market/movers?minChange=15&maxChange=20
GET  /api/market/symbol/:symbol
GET  /api/market/commodities
GET  /api/market/search?q=RELIANCE
```

### Signals APIs
```
GET  /api/signals
GET  /api/signals?symbol=NIFTY
```

### Scanner APIs
```
GET  /api/scanner/alerts
```

### WebSocket Events
```
explosion_alert   - Real-time option explosions
signal_update     - Real-time signal updates
market_update     - Real-time market data
```

---

## 🎨 UI Screens

1. **Dashboard** - Market overview, indices, gainers, losers, IPOs
2. **Signals** - BUY/SELL/STRONG BUY/STRONG SELL with filters
3. **Scanner** - Real-time option explosion alerts
4. **Option Chain** - Complete option chain with signals
5. **Movers** - 15-20% daily movement stocks
6. **Commodities** - Gold, Silver, Crude, Natural Gas
7. **Market Heatmap** - Sector performance visualization
8. **Symbol Detail** - Individual stock/index details
9. **Settings** - Profile, notifications, Angel One status

---

## 🧪 Testing

```bash
# Backend tests
cd backend
npm run test

# Manual API testing
curl http://localhost:3000/api/signals
curl http://localhost:3000/api/scanner/alerts
```

---

## 📦 Project Stats

- **Total Files**: 62 (35 backend + 24 frontend + 3 docs)
- **Backend Lines**: ~3,500 TypeScript
- **Frontend Lines**: ~2,500 JavaScript
- **Modules**: 8 NestJS modules
- **Services**: 20+ injectable services
- **Controllers**: 4 REST controllers
- **Gateways**: 1 WebSocket gateway

---

## 🛠️ Tech Stack

### Backend
- **NestJS 10** - Progressive Node.js framework
- **TypeScript 5** - Type-safe development
- **MongoDB Native Driver** - Database
- **Socket.IO** - WebSocket server
- **SmartAPI** - Angel One integration
- **technicalindicators** - Technical analysis
- **Jest** - Testing framework

### Frontend
- **React 18** - UI library
- **React Router v6** - Routing
- **Shadcn UI** - Component library
- **Tailwind CSS** - Styling
- **Socket.IO Client** - WebSocket client
- **Axios** - HTTP client
- **Sonner** - Toast notifications

---

## 🔒 Signal Generation Flow

```
Input (OHLC + Volume + VIX)
  ↓
Safety Layer Check (Expiry/Result/Weekend/VIX/Hours)
  ↓
Market Regime Analysis (5 states)
  ↓
Technical Indicators (EMA/RSI/MACD)
  ↓
Market Structure (HH/HL vs LH/LL)
  ↓
Price Action (7 candle patterns)
  ↓
Volume Confirmation (1.5x threshold)
  ↓
Breakout/Breakdown Detection (Real vs Fake)
  ↓
Signal Output (STRONG BUY/BUY/WAIT/SELL/STRONG SELL)
```

---

## 📚 Documentation

Comprehensive documentation in `/docs`:
- **MAHASHAKTI_DEPLOYMENT.md** - Complete deployment guide
- **FILE_STRUCTURE_COMPLETE.md** - All 62 files with paths
- **ADVANCED_SIGNAL_ENGINE_COMPLETE.md** - Signal engine deep-dive

---

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

---

## 🔗 Related Repositories

- **Legacy Backend**: [MAHASHAKTI-MARKET-PRO](https://github.com/ashvinasnani93-afk/MAHSHAKTI-MARKET-PRO) (Python/FastAPI)

---

## 📄 License

MIT License - See LICENSE file

---

## 🙏 Credits

- **Angel One** - SmartAPI for market data
- **NestJS Team** - Amazing framework
- **React Team** - UI library

---

## 📞 Support

- GitHub Issues: [Create an issue](https://github.com/ashvinasnani93-afk/MAHASHAKTI-NEXT/issues)
- Email: support@mahashakti.com

---

## 🌟 Star This Repo

If you find this project useful, please ⭐ star it!

---

**Built with ❤️ for Traders by Mahashakti Team**

*Next-generation trading platform with institutional-grade analysis*
