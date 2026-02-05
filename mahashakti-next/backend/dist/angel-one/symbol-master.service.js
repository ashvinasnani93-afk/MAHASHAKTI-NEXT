"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var SymbolMasterService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SymbolMasterService = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = __importDefault(require("axios"));
let SymbolMasterService = SymbolMasterService_1 = class SymbolMasterService {
    constructor() {
        this.logger = new common_1.Logger(SymbolMasterService_1.name);
        this.symbolsData = [];
        this.fnoSymbols = [];
    }
    async loadSymbolMaster() {
        try {
            const url = 'https://margincalculator.angelbroking.com/OpenAPI_File/files/OpenAPIScripMaster.json';
            const response = await axios_1.default.get(url, { timeout: 30000 });
            if (response.status === 200) {
                this.symbolsData = response.data;
                this.logger.log(`✅ Loaded ${this.symbolsData.length} symbols`);
                return true;
            }
            this.logger.error(`❌ Failed to load symbol master: ${response.status}`);
            return false;
        }
        catch (error) {
            this.logger.error(`❌ Error loading symbol master: ${error.message}`);
            return false;
        }
    }
    getFnoStocks() {
        if (!this.symbolsData.length) {
            return [];
        }
        try {
            const fnoData = this.symbolsData.filter((item) => item.exch_seg === 'NFO' &&
                (item.instrumenttype === 'OPTIDX' || item.instrumenttype === 'OPTSTK'));
            const uniqueNames = new Set();
            fnoData.forEach((item) => uniqueNames.add(item.name));
            this.fnoSymbols = Array.from(uniqueNames);
            return this.fnoSymbols;
        }
        catch (error) {
            this.logger.error(`Error getting F&O stocks: ${error.message}`);
            return [];
        }
    }
    getOptionContracts(underlying, weekly = true, monthly = true) {
        if (!this.symbolsData.length) {
            return [];
        }
        try {
            const today = new Date();
            const optionsData = this.symbolsData.filter((item) => item.name === underlying &&
                (item.instrumenttype === 'OPTIDX' || item.instrumenttype === 'OPTSTK'));
            if (!optionsData.length) {
                return [];
            }
            const contracts = [];
            for (const item of optionsData) {
                try {
                    const expiryDate = this.parseExpiry(item.expiry);
                    if (!expiryDate || expiryDate < today)
                        continue;
                    const currentWeekEnd = this.getWeekEnd(today);
                    const currentMonthEnd = this.getMonthEnd(today);
                    if ((weekly && expiryDate <= currentWeekEnd) || (monthly && expiryDate <= currentMonthEnd)) {
                        contracts.push({
                            symbol: item.symbol,
                            name: item.name,
                            token: item.token,
                            exchange: item.exch_seg,
                            strike: parseFloat(item.strike) / 100,
                            optionType: item.symbol.slice(-2),
                            expiry: item.expiry,
                            expiryDate: expiryDate.toISOString().split('T')[0],
                            lotSize: parseInt(item.lotsize || '1', 10),
                        });
                    }
                }
                catch (err) {
                    continue;
                }
            }
            return contracts;
        }
        catch (error) {
            this.logger.error(`Error getting option contracts for ${underlying}: ${error.message}`);
            return [];
        }
    }
    getAllIndexOptions() {
        const allOptions = [];
        const indices = ['NIFTY', 'BANKNIFTY', 'FINNIFTY'];
        for (const index of indices) {
            const options = this.getOptionContracts(index, true, true);
            allOptions.push(...options);
        }
        return allOptions;
    }
    getToken(symbol, exchange = 'NSE') {
        if (!this.symbolsData.length) {
            return null;
        }
        const match = this.symbolsData.find((item) => item.symbol === symbol && item.exch_seg === exchange);
        return match ? match.token : null;
    }
    parseExpiry(expiryStr) {
        try {
            const day = parseInt(expiryStr.slice(0, 2), 10);
            const monthStr = expiryStr.slice(2, 5);
            const year = parseInt(expiryStr.slice(5), 10);
            const months = {
                JAN: 0,
                FEB: 1,
                MAR: 2,
                APR: 3,
                MAY: 4,
                JUN: 5,
                JUL: 6,
                AUG: 7,
                SEP: 8,
                OCT: 9,
                NOV: 10,
                DEC: 11,
            };
            const month = months[monthStr];
            if (month === undefined)
                return null;
            return new Date(year, month, day);
        }
        catch {
            return null;
        }
    }
    getWeekEnd(date) {
        const dayOfWeek = date.getDay();
        const daysUntilThursday = (4 - dayOfWeek + 7) % 7;
        const weekEnd = new Date(date);
        weekEnd.setDate(date.getDate() + daysUntilThursday);
        return weekEnd;
    }
    getMonthEnd(date) {
        return new Date(date.getFullYear(), date.getMonth() + 1, 0);
    }
};
exports.SymbolMasterService = SymbolMasterService;
exports.SymbolMasterService = SymbolMasterService = SymbolMasterService_1 = __decorate([
    (0, common_1.Injectable)()
], SymbolMasterService);
//# sourceMappingURL=symbol-master.service.js.map