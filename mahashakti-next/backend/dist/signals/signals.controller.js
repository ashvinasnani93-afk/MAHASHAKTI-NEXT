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
exports.SignalsController = void 0;
const common_1 = require("@nestjs/common");
const signal_generator_service_1 = require("./signal-generator.service");
let SignalsController = class SignalsController {
    constructor(signalGeneratorService) {
        this.signalGeneratorService = signalGeneratorService;
    }
    getSignals(symbol) {
        const mockPrices = Array.from({ length: 100 }, (_, i) => 23000 + Math.random() * 500);
        const mockHighs = Array.from({ length: 100 }, (_, i) => 23100 + Math.random() * 500);
        const mockLows = Array.from({ length: 100 }, (_, i) => 22900 + Math.random() * 500);
        const mockOpens = Array.from({ length: 100 }, (_, i) => 23000 + Math.random() * 500);
        const mockVolume = Array.from({ length: 100 }, () => Math.random() * 10000);
        const mockVIX = 18.5;
        const symbols = symbol ? [symbol] : ['NIFTY', 'BANKNIFTY', 'FINNIFTY'];
        const signals = symbols.map((sym) => this.signalGeneratorService.generateSignal(sym, mockPrices, mockHighs, mockLows, mockVolume, mockOpens, mockVIX));
        return {
            success: true,
            data: signals,
        };
    }
};
exports.SignalsController = SignalsController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('symbol')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], SignalsController.prototype, "getSignals", null);
exports.SignalsController = SignalsController = __decorate([
    (0, common_1.Controller)('api/signals'),
    __metadata("design:paramtypes", [signal_generator_service_1.SignalGeneratorService])
], SignalsController);
//# sourceMappingURL=signals.controller.js.map