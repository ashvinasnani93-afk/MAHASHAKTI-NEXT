"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var SafetyLayerService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SafetyLayerService = void 0;
const common_1 = require("@nestjs/common");
let SafetyLayerService = SafetyLayerService_1 = class SafetyLayerService {
    constructor() {
        this.logger = new common_1.Logger(SafetyLayerService_1.name);
    }
    checkSafety(symbol, vix) {
        const blockedBy = [];
        if (this.isExpiryDay()) {
            blockedBy.push('EXPIRY_DAY');
        }
        if (this.isResultDay(symbol)) {
            blockedBy.push('RESULT_DAY');
        }
        if (this.isWeekend()) {
            blockedBy.push('WEEKEND');
        }
        if (vix && vix > 25) {
            blockedBy.push('HIGH_VIX');
        }
        if (!this.isMarketHours()) {
            blockedBy.push('AFTER_HOURS');
        }
        const allowed = blockedBy.length === 0;
        const reason = allowed
            ? 'All safety checks passed'
            : `Blocked by: ${blockedBy.join(', ')}`;
        return {
            allowed,
            reason,
            blockedBy,
        };
    }
    isExpiryDay() {
        const now = new Date();
        const day = now.getDay();
        if (day === 4)
            return true;
        const lastDayOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);
        const lastThursday = this.getLastThursday(now.getFullYear(), now.getMonth());
        if (now.getDate() === lastThursday.getDate())
            return true;
        return false;
    }
    getLastThursday(year, month) {
        const lastDay = new Date(year, month + 1, 0);
        const day = lastDay.getDay();
        const diff = day >= 4 ? day - 4 : day + 3;
        return new Date(year, month, lastDay.getDate() - diff);
    }
    isResultDay(symbol) {
        const hash = symbol.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
        return hash % 20 === 0;
    }
    isWeekend() {
        const day = new Date().getDay();
        return day === 0 || day === 6;
    }
    isMarketHours() {
        const now = new Date();
        const hours = now.getHours();
        const minutes = now.getMinutes();
        const marketStart = 9 * 60 + 15;
        const marketEnd = 15 * 60 + 30;
        const currentTime = hours * 60 + minutes;
        return currentTime >= marketStart && currentTime <= marketEnd;
    }
    isHighRiskPeriod() {
        return this.isExpiryDay() || !this.isMarketHours();
    }
};
exports.SafetyLayerService = SafetyLayerService;
exports.SafetyLayerService = SafetyLayerService = SafetyLayerService_1 = __decorate([
    (0, common_1.Injectable)()
], SafetyLayerService);
//# sourceMappingURL=safety-layer.service.js.map