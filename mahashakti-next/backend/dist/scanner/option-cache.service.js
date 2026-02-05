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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var OptionCacheService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.OptionCacheService = void 0;
const common_1 = require("@nestjs/common");
const node_cache_1 = __importDefault(require("node-cache"));
const config_service_1 = require("../config/config.service");
let OptionCacheService = OptionCacheService_1 = class OptionCacheService {
    constructor(configService) {
        this.configService = configService;
        this.logger = new common_1.Logger(OptionCacheService_1.name);
        this.maxHistorySize = 150;
        this.cache = new node_cache_1.default({
            stdTTL: this.configService.cacheDuration / 1000,
            checkperiod: 60,
        });
    }
    updateTick(token, ltp, volume, oi, iv) {
        const history = this.getHistory(token);
        const timestamp = Date.now();
        history.ltp.push(ltp);
        history.volume.push(volume);
        history.oi.push(oi);
        history.iv.push(iv);
        history.timestamps.push(timestamp);
        if (history.ltp.length > this.maxHistorySize) {
            history.ltp.shift();
            history.volume.shift();
            history.oi.shift();
            history.iv.shift();
            history.timestamps.shift();
        }
        this.cache.set(token, history);
    }
    getHistory(token) {
        const existing = this.cache.get(token);
        if (existing) {
            return existing;
        }
        return {
            ltp: [],
            volume: [],
            oi: [],
            iv: [],
            timestamps: [],
        };
    }
    getPriceChange(token) {
        const history = this.getHistory(token);
        if (history.ltp.length < 2)
            return 0;
        const current = history.ltp[history.ltp.length - 1];
        const old = history.ltp[0];
        if (old === 0)
            return 0;
        return ((current - old) / old) * 100;
    }
    getVolumeSpike(token) {
        const history = this.getHistory(token);
        if (history.volume.length < 2)
            return 0;
        const current = history.volume[history.volume.length - 1];
        const avg = history.volume.slice(0, -1).reduce((a, b) => a + b, 0) / (history.volume.length - 1);
        if (avg === 0)
            return 0;
        return current / avg;
    }
    getOIChange(token) {
        const history = this.getHistory(token);
        if (history.oi.length < 2)
            return 0;
        const current = history.oi[history.oi.length - 1];
        const old = history.oi[0];
        if (old === 0)
            return 0;
        return ((current - old) / old) * 100;
    }
    getIVChange(token) {
        const history = this.getHistory(token);
        if (history.iv.length < 2)
            return 0;
        const current = history.iv[history.iv.length - 1];
        const old = history.iv[0];
        if (old === 0)
            return 0;
        return ((current - old) / old) * 100;
    }
    clearCache() {
        this.cache.flushAll();
    }
};
exports.OptionCacheService = OptionCacheService;
exports.OptionCacheService = OptionCacheService = OptionCacheService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_service_1.ConfigService])
], OptionCacheService);
//# sourceMappingURL=option-cache.service.js.map