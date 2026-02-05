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
var AngelOneService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AngelOneService = void 0;
const common_1 = require("@nestjs/common");
const smartapi_javascript_1 = require("smartapi-javascript");
const otplib_1 = require("otplib");
const config_service_1 = require("../config/config.service");
let AngelOneService = AngelOneService_1 = class AngelOneService {
    constructor(configService) {
        this.configService = configService;
        this.logger = new common_1.Logger(AngelOneService_1.name);
        this.isLoggedIn = false;
    }
    async login() {
        try {
            this.smartApi = new smartapi_javascript_1.SmartAPI({
                api_key: this.configService.angelApiKey,
            });
            const totp = otplib_1.authenticator.generate(this.configService.angelTotpSecret);
            const loginResponse = await this.smartApi.generateSession(this.configService.angelClientId, this.configService.angelPassword, totp);
            if (loginResponse.status) {
                this.authToken = loginResponse.data.jwtToken;
                this.refreshToken = loginResponse.data.refreshToken;
                this.feedToken = loginResponse.data.feedToken;
                this.isLoggedIn = true;
                this.logger.log('✅ Angel One login successful');
                return true;
            }
            else {
                this.logger.error(`❌ Angel One login failed: ${loginResponse.message}`);
                return false;
            }
        }
        catch (error) {
            this.logger.error(`❌ Angel One login exception: ${error.message}`);
            return false;
        }
    }
    async getProfile() {
        try {
            if (!this.isLoggedIn) {
                await this.login();
            }
            return await this.smartApi.getProfile(this.refreshToken);
        }
        catch (error) {
            this.logger.error(`Error getting profile: ${error.message}`);
            return null;
        }
    }
    async getLTP(exchange, tradingSymbol, symbolToken) {
        try {
            if (!this.isLoggedIn) {
                await this.login();
            }
            const ltpData = await this.smartApi.ltpData(exchange, tradingSymbol, symbolToken);
            return ltpData;
        }
        catch (error) {
            this.logger.error(`Error getting LTP: ${error.message}`);
            return null;
        }
    }
    async getMarketData(mode, exchangeTokens) {
        try {
            if (!this.isLoggedIn) {
                await this.login();
            }
            return await this.smartApi.getMarketData(mode, exchangeTokens);
        }
        catch (error) {
            this.logger.error(`Error getting market data: ${error.message}`);
            return null;
        }
    }
    getFeedToken() {
        return this.feedToken;
    }
    getSmartApi() {
        return this.smartApi;
    }
    isAuthenticated() {
        return this.isLoggedIn;
    }
};
exports.AngelOneService = AngelOneService;
exports.AngelOneService = AngelOneService = AngelOneService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_service_1.ConfigService])
], AngelOneService);
//# sourceMappingURL=angel-one.service.js.map