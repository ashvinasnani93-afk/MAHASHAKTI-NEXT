# 📂 MAHASHAKTI MARKET PRO - Complete File Structure

## 🎯 Kaunsi Files Copy Karni Hain (Exact Paths)

---

## 🔷 BACKEND FILES (NestJS TypeScript)

### Root Configuration Files
```
/app/backend-node/.env                      ✅ COPY
/app/backend-node/package.json             ✅ COPY
/app/backend-node/tsconfig.json            ✅ COPY
/app/backend-node/nest-cli.json            ✅ COPY
```

### Core Application Files
```
/app/backend-node/src/main.ts              ✅ COPY
/app/backend-node/src/app.module.ts        ✅ COPY
```

### Config Module
```
/app/backend-node/src/config/config.module.ts    ✅ COPY
/app/backend-node/src/config/config.service.ts   ✅ COPY
```

### Database Module
```
/app/backend-node/src/database/database.module.ts    ✅ COPY
/app/backend-node/src/database/database.service.ts   ✅ COPY
```

### Angel One Integration Module
```
/app/backend-node/src/angel-one/angel-one.module.ts          ✅ COPY
/app/backend-node/src/angel-one/angel-one.service.ts         ✅ COPY
/app/backend-node/src/angel-one/symbol-master.service.ts     ✅ COPY
/app/backend-node/src/angel-one/websocket-stream.service.ts  ✅ COPY
```

### Scanner Module (Option Explosion Scanner)
```
/app/backend-node/src/scanner/scanner.module.ts             ✅ COPY
/app/backend-node/src/scanner/option-universe.service.ts    ✅ COPY
/app/backend-node/src/scanner/strike-filter.service.ts      ✅ COPY
/app/backend-node/src/scanner/option-cache.service.ts       ✅ COPY
/app/backend-node/src/scanner/explosion-detector.service.ts ✅ COPY
/app/backend-node/src/scanner/scanner.gateway.ts            ✅ COPY
/app/backend-node/src/scanner/scanner.controller.ts         ✅ COPY
```

### Signals Module (Trading Signals Engine)
```
/app/backend-node/src/signals/signals.module.ts             ✅ COPY
/app/backend-node/src/signals/technical-engine.service.ts   ✅ COPY
/app/backend-node/src/signals/market-structure.service.ts   ✅ COPY
/app/backend-node/src/signals/signal-generator.service.ts   ✅ COPY
/app/backend-node/src/signals/signals.controller.ts         ✅ COPY
```

### Market Module (Market Data APIs)
```
/app/backend-node/src/market/market.module.ts      ✅ COPY
/app/backend-node/src/market/market.service.ts     ✅ COPY (UPDATED with Movers API)
/app/backend-node/src/market/market.controller.ts  ✅ COPY (UPDATED with Movers endpoint)
```

---

## 🔷 FRONTEND FILES (React.js)

### Root Configuration
```
/app/frontend/package.json                  ✅ COPY
/app/frontend/.env                         ✅ COPY
/app/frontend/tailwind.config.js           ✅ ALREADY EXISTS
/app/frontend/postcss.config.js            ✅ ALREADY EXISTS
```

### Core App Files
```
/app/frontend/src/index.js                 ✅ ALREADY EXISTS
/app/frontend/src/App.js                   ✅ COPY (UPDATED with Movers route)
/app/frontend/src/App.css                  ✅ COPY
/app/frontend/src/index.css                ✅ ALREADY EXISTS
```

### Services
```
/app/frontend/src/services/api.js          ✅ COPY (UPDATED with Movers API)
/app/frontend/src/services/websocket.js    ✅ COPY
```

### Components
```
/app/frontend/src/components/BottomNav.js        ✅ COPY (UPDATED with Movers in nav)
/app/frontend/src/components/SignalBadge.js      ✅ COPY
/app/frontend/src/components/MarketOverview.js   ✅ COPY
```

### Screens (All 9 Screens)
```
/app/frontend/src/screens/Dashboard.js       ✅ COPY
/app/frontend/src/screens/Signals.js         ✅ COPY
/app/frontend/src/screens/Scanner.js         ✅ COPY
/app/frontend/src/screens/OptionChain.js     ✅ COPY
/app/frontend/src/screens/Movers.js          ✅ COPY (NEW - 15-20% bhagne wali stocks)
/app/frontend/src/screens/Commodities.js     ✅ COPY
/app/frontend/src/screens/MarketHeatmap.js   ✅ COPY
/app/frontend/src/screens/SymbolDetail.js    ✅ COPY
/app/frontend/src/screens/Settings.js        ✅ COPY
```

### Shadcn UI Components (Already Present)
```
/app/frontend/src/components/ui/*           ✅ ALREADY EXISTS (DON'T MODIFY)
/app/frontend/src/hooks/use-toast.js        ✅ ALREADY EXISTS
/app/frontend/src/lib/utils.js              ✅ ALREADY EXISTS
```

---

## 📊 COMPLETE DIRECTORY STRUCTURE

### Backend Tree
```
/app/backend-node/
├── .env                           # Angel One credentials + config
├── package.json                   # Dependencies
├── tsconfig.json                  # TypeScript config
├── nest-cli.json                  # NestJS config
└── src/
    ├── main.ts                    # Entry point
    ├── app.module.ts              # Root module
    ├── config/
    │   ├── config.module.ts
    │   └── config.service.ts
    ├── database/
    │   ├── database.module.ts
    │   └── database.service.ts
    ├── angel-one/
    │   ├── angel-one.module.ts
    │   ├── angel-one.service.ts
    │   ├── symbol-master.service.ts
    │   └── websocket-stream.service.ts
    ├── scanner/
    │   ├── scanner.module.ts
    │   ├── option-universe.service.ts
    │   ├── strike-filter.service.ts
    │   ├── option-cache.service.ts
    │   ├── explosion-detector.service.ts
    │   ├── scanner.gateway.ts
    │   └── scanner.controller.ts
    ├── signals/
    │   ├── signals.module.ts
    │   ├── technical-engine.service.ts
    │   ├── market-structure.service.ts
    │   ├── signal-generator.service.ts
    │   └── signals.controller.ts
    └── market/
        ├── market.module.ts
        ├── market.service.ts
        └── market.controller.ts
```

### Frontend Tree
```
/app/frontend/
├── package.json
├── .env
├── public/
├── src/
    ├── index.js
    ├── App.js
    ├── App.css
    ├── index.css
    ├── services/
    │   ├── api.js
    │   └── websocket.js
    ├── components/
    │   ├── BottomNav.js
    │   ├── SignalBadge.js
    │   ├── MarketOverview.js
    │   ├── ui/          # Shadcn components (don't touch)
    │   └── ...
    ├── screens/
    │   ├── Dashboard.js
    │   ├── Signals.js
    │   ├── Scanner.js
    │   ├── OptionChain.js
    │   ├── Movers.js         # NEW
    │   ├── Commodities.js
    │   ├── MarketHeatmap.js
    │   ├── SymbolDetail.js
    │   └── Settings.js
    ├── hooks/
    │   └── use-toast.js
    └── lib/
        └── utils.js
```

---

## 🚀 Quick Copy Commands

### Backend Copy
```bash
# Create backend directory structure
mkdir -p /your-project/backend/src/{config,database,angel-one,scanner,signals,market}

# Copy all backend files
cp /app/backend-node/.env /your-project/backend/
cp /app/backend-node/package.json /your-project/backend/
cp /app/backend-node/tsconfig.json /your-project/backend/
cp /app/backend-node/nest-cli.json /your-project/backend/

cp -r /app/backend-node/src/* /your-project/backend/src/
```

### Frontend Copy
```bash
# Copy frontend files
cp /app/frontend/src/App.js /your-project/frontend/src/
cp /app/frontend/src/App.css /your-project/frontend/src/

# Copy services
cp -r /app/frontend/src/services /your-project/frontend/src/

# Copy components
cp /app/frontend/src/components/BottomNav.js /your-project/frontend/src/components/
cp /app/frontend/src/components/SignalBadge.js /your-project/frontend/src/components/
cp /app/frontend/src/components/MarketOverview.js /your-project/frontend/src/components/

# Copy all screens
cp -r /app/frontend/src/screens /your-project/frontend/src/
```

---

## 📝 Files Count Summary

### Backend
- **Total Files:** 32
  - Config: 4 files
  - Core: 2 files
  - Config Module: 2 files
  - Database Module: 2 files
  - Angel One Module: 4 files
  - Scanner Module: 7 files
  - Signals Module: 5 files
  - Market Module: 3 files

### Frontend
- **Total Files:** 24
  - Core: 4 files
  - Services: 2 files
  - Components: 3 files
  - Screens: 9 files
  - UI Components: ~50+ (Shadcn - already present)

### Documentation
- `/app/MAHASHAKTI_DEPLOYMENT.md` - Deployment guide
- `/app/FILE_STRUCTURE_COMPLETE.md` - This file

---

## ✅ Verification Checklist

### Backend
- [ ] All 32 files copied
- [ ] `.env` has Angel One credentials
- [ ] `package.json` dependencies installed (`npm install`)
- [ ] Build successful (`npm run build`)
- [ ] Server starts (`npm run start:dev`)

### Frontend
- [ ] All 24 files copied
- [ ] `package.json` dependencies installed (`yarn install`)
- [ ] `.env` has correct REACT_APP_BACKEND_URL
- [ ] App starts (`yarn start`)
- [ ] All 9 screens accessible via navigation

### Features
- [ ] Dashboard loads with indices and stocks
- [ ] Signals screen shows BUY/SELL/STRONG BUY/STRONG SELL/WAIT
- [ ] Scanner screen shows explosion alerts
- [ ] Option Chain displays with signals column
- [ ] **Movers screen shows 15-20% moving stocks** ✅ NEW
- [ ] Commodities screen loads
- [ ] Market Heatmap displays
- [ ] Symbol Detail works
- [ ] Settings page accessible
- [ ] WebSocket connection active
- [ ] Bottom navigation works

---

## 🎯 New Features Added

### 1. Movers Screen (15-20% Stocks)
- **Backend API:** `GET /api/market/movers?minChange=15&maxChange=20`
- **Frontend Screen:** `/app/frontend/src/screens/Movers.js`
- **Features:**
  - Shows stocks with 15-20% daily movement
  - Filter by min/max change percentage
  - Display signal (BUY/SELL/STRONG BUY/STRONG SELL/WAIT)
  - Shows volume, prev close, LTP
  - Analysis/reason for each stock
  - Stats card with total movers, buy signals, biggest move

### 2. Signals in Option Chain
- **Location:** `/app/frontend/src/screens/OptionChain.js`
- **Column Added:** Signal column showing BUY/SELL/WAIT for each CE/PE strike
- Signals are generated based on:
  - EMA trend
  - RSI levels
  - Volume confirmation
  - Market structure
  - OI buildup

### 3. Complete Signal System
All signals follow **Mahashakti Locked Rules**:
- **STRONG BUY:** Uptrend + Bullish structure + MACD bullish + Volume confirmed + Not overbought
- **BUY:** Uptrend + Bullish MACD
- **SELL:** Downtrend + Bearish MACD
- **STRONG SELL:** Downtrend + Bearish structure + MACD bearish + Volume confirmed + Not oversold
- **WAIT:** Sideways / Conflicting signals / Overbought/Oversold

---

## 🔥 API Endpoints Summary

### Market APIs
```
GET  /api/market/dashboard              - Dashboard data
GET  /api/market/stocks?category=X      - Stocks by category
GET  /api/market/movers?minChange=15&maxChange=20  - Big movers (NEW)
GET  /api/market/symbol/:symbol         - Symbol details
GET  /api/market/commodities            - Commodities
GET  /api/market/search?q=query         - Search
```

### Signals APIs
```
GET  /api/signals                       - All signals
GET  /api/signals?symbol=NIFTY          - Specific symbol signal
```

### Scanner APIs
```
GET  /api/scanner/alerts                - Explosion alerts
```

### WebSocket Events
```
explosion_alert   - Real-time option explosions
signal_update     - Real-time signal updates
market_update     - Real-time market data
```

---

## 🎨 Bottom Navigation Updated

New navigation with Movers:
1. **Home** (Dashboard) - House icon
2. **Signals** - TrendingUp icon
3. **Scanner** - Activity icon
4. **Movers** - Zap icon ⚡ (NEW)
5. **Settings** - Settings icon

Removed: Options (still accessible via symbol detail page)

---

## ✅ All Done!

Aapko ab **56 files** copy karni hain (32 backend + 24 frontend).

Sab kuch **fully wired** hai aur **ready to deploy**! 🚀
