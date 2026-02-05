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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MarketController = void 0;
const common_1 = require("@nestjs/common");
const market_service_1 = require("./market.service");
let MarketController = class MarketController {
    constructor(marketService) {
        this.marketService = marketService;
    }
    async getDashboard() {
        const data = await this.marketService.getDashboardData();
        return {
            success: true,
            data,
        };
    }
    async getStocks(category) {
        const data = await this.marketService.getStocksByCategory(category);
        return {
            success: true,
            data,
        };
    }
    async getMovers(minChange, maxChange) {
        const min = parseFloat(minChange || '15');
        const max = parseFloat(maxChange || '20');
        const data = await this.marketService.getBigMovers(min, max);
        return {
            success: true,
            data,
        };
    }
    async getSymbolDetail(symbol) {
        const data = await this.marketService.getSymbolDetail(symbol);
        return {
            success: true,
            data,
        };
    }
    async getCommodities() {
        const data = await this.marketService.getCommodities();
        return {
            success: true,
            data,
        };
    }
    async search(query) {
        const data = await this.marketService.searchSymbols(query);
        return {
            success: true,
            data,
        };
    }
};
exports.MarketController = MarketController;
__decorate([
    (0, common_1.Get)('/dashboard'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], MarketController.prototype, "getDashboard", null);
__decorate([
    (0, common_1.Get)('/stocks'),
    __param(0, (0, common_1.Query)('category')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MarketController.prototype, "getStocks", null);
__decorate([
    (0, common_1.Get)('/movers'),
    __param(0, (0, common_1.Query)('minChange')),
    __param(1, (0, common_1.Query)('maxChange')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], MarketController.prototype, "getMovers", null);
__decorate([
    (0, common_1.Get)('/symbol/:symbol'),
    __param(0, (0, common_1.Param)('symbol')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MarketController.prototype, "getSymbolDetail", null);
__decorate([
    (0, common_1.Get)('/commodities'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], MarketController.prototype, "getCommodities", null);
__decorate([
    (0, common_1.Get)('/search'),
    __param(0, (0, common_1.Query)('q')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MarketController.prototype, "search", null);
exports.MarketController = MarketController = __decorate([
    (0, common_1.Controller)('api/market'),
    __metadata("design:paramtypes", [market_service_1.MarketService])
], MarketController);
//# sourceMappingURL=market.controller.js.map