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
var ExplosionDetectorService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExplosionDetectorService = void 0;
const common_1 = require("@nestjs/common");
const option_universe_service_1 = require("./option-universe.service");
const strike_filter_service_1 = require("./strike-filter.service");
const option_cache_service_1 = require("./option-cache.service");
const config_service_1 = require("../config/config.service");
const scanner_gateway_1 = require("./scanner.gateway");
let ExplosionDetectorService = ExplosionDetectorService_1 = class ExplosionDetectorService {
    constructor(optionUniverseService, strikeFilterService, optionCacheService, configService, scannerGateway) {
        this.optionUniverseService = optionUniverseService;
        this.strikeFilterService = strikeFilterService;
        this.optionCacheService = optionCacheService;
        this.configService = configService;
        this.scannerGateway = scannerGateway;
        this.logger = new common_1.Logger(ExplosionDetectorService_1.name);
        this.scannerInterval = null;
        this.alerts = [];
    }
    async onModuleInit() {
        setTimeout(() => {
            this.startScanner();
        }, 10000);
    }
    startScanner() {
        this.logger.log('🚨 Starting Option Explosion Scanner...');
        this.scannerInterval = setInterval(async () => {
            await this.scan();
        }, this.configService.scannerInterval);
    }
    stopScanner() {
        if (this.scannerInterval) {
            clearInterval(this.scannerInterval);
            this.scannerInterval = null;
        }
    }
    async scan() {
        try {
            const universe = this.optionUniverseService.getUniverse();
            for (const option of universe) {
                this.simulateMarketData(option.token);
                const alert = this.detectExplosion(option);
                if (alert) {
                    this.alerts.unshift(alert);
                    this.alerts = this.alerts.slice(0, 100);
                    this.scannerGateway.broadcastAlert(alert);
                    this.logger.log(`💥 EXPLOSION DETECTED: ${alert.symbol} ${alert.strike}${alert.optionType} | Score: ${alert.score} | Tag: ${alert.signalTag}`);
                }
            }
        }
        catch (error) {
            this.logger.error(`Scanner error: ${error.message}`);
        }
    }
    detectExplosion(option) {
        const priceChange = this.optionCacheService.getPriceChange(option.token);
        const volumeSpike = this.optionCacheService.getVolumeSpike(option.token);
        const oiChange = this.optionCacheService.getOIChange(option.token);
        const ivChange = this.optionCacheService.getIVChange(option.token);
        let score = 0;
        if (Math.abs(priceChange) >= this.configService.explosionPriceChange) {
            score += 3;
        }
        if (volumeSpike >= this.configService.explosionVolumeSpike) {
            score += 2;
        }
        if (Math.abs(oiChange) >= this.configService.explosionOiChange) {
            score += 2;
        }
        if (Math.abs(ivChange) >= this.configService.explosionIvChange) {
            score += 2;
        }
        if (score < this.configService.explosionScoreThreshold) {
            return null;
        }
        let signalTag = 'OPTION BLAST';
        if (volumeSpike > 10 && Math.abs(priceChange) < 10) {
            signalTag = 'SMART MONEY ENTRY';
        }
        else if (Math.abs(priceChange) > 60) {
            signalTag = 'FAST MOMENTUM';
        }
        const history = this.optionCacheService.getHistory(option.token);
        const ltp = history.ltp.length > 0 ? history.ltp[history.ltp.length - 1] : 0;
        return {
            symbol: option.name,
            strike: option.strike,
            optionType: option.optionType,
            ltp,
            priceChange,
            volumeSpike,
            oiChange,
            ivChange,
            score,
            signalTag,
            timestamp: Date.now(),
        };
    }
    simulateMarketData(token) {
        const ltp = Math.random() * 100 + 50;
        const volume = Math.random() * 10000;
        const oi = Math.random() * 50000;
        const iv = Math.random() * 50 + 10;
        this.optionCacheService.updateTick(token, ltp, volume, oi, iv);
    }
    getAlerts() {
        return this.alerts;
    }
};
exports.ExplosionDetectorService = ExplosionDetectorService;
exports.ExplosionDetectorService = ExplosionDetectorService = ExplosionDetectorService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [option_universe_service_1.OptionUniverseService,
        strike_filter_service_1.StrikeFilterService,
        option_cache_service_1.OptionCacheService,
        config_service_1.ConfigService,
        scanner_gateway_1.ScannerGateway])
], ExplosionDetectorService);
//# sourceMappingURL=explosion-detector.service.js.map