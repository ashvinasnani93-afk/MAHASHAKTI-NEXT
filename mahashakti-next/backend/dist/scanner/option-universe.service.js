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
var OptionUniverseService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.OptionUniverseService = void 0;
const common_1 = require("@nestjs/common");
const symbol_master_service_1 = require("../angel-one/symbol-master.service");
let OptionUniverseService = OptionUniverseService_1 = class OptionUniverseService {
    constructor(symbolMasterService) {
        this.symbolMasterService = symbolMasterService;
        this.logger = new common_1.Logger(OptionUniverseService_1.name);
        this.optionUniverse = [];
    }
    async onModuleInit() {
        await this.loadUniverse();
    }
    async loadUniverse() {
        try {
            await this.symbolMasterService.loadSymbolMaster();
            const indexOptions = this.symbolMasterService.getAllIndexOptions();
            const fnoStocks = this.symbolMasterService.getFnoStocks();
            const stockOptions = [];
            for (const stock of fnoStocks.slice(0, 100)) {
                const options = this.symbolMasterService.getOptionContracts(stock, true, true);
                stockOptions.push(...options);
            }
            this.optionUniverse = [...indexOptions, ...stockOptions];
            this.logger.log(`✅ Loaded ${this.optionUniverse.length} option contracts`);
        }
        catch (error) {
            this.logger.error(`❌ Error loading option universe: ${error.message}`);
        }
    }
    getUniverse() {
        return this.optionUniverse;
    }
    getByUnderlying(underlying) {
        return this.optionUniverse.filter((opt) => opt.name === underlying);
    }
};
exports.OptionUniverseService = OptionUniverseService;
exports.OptionUniverseService = OptionUniverseService = OptionUniverseService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [symbol_master_service_1.SymbolMasterService])
], OptionUniverseService);
//# sourceMappingURL=option-universe.service.js.map