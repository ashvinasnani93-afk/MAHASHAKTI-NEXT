"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignalsModule = void 0;
const common_1 = require("@nestjs/common");
const angel_one_module_1 = require("../angel-one/angel-one.module");
const scanner_module_1 = require("../scanner/scanner.module");
const technical_engine_service_1 = require("./technical-engine.service");
const market_structure_service_1 = require("./market-structure.service");
const market_regime_service_1 = require("./market-regime.service");
const safety_layer_service_1 = require("./safety-layer.service");
const price_action_service_1 = require("./price-action.service");
const signal_generator_service_1 = require("./signal-generator.service");
const signals_controller_1 = require("./signals.controller");
let SignalsModule = class SignalsModule {
};
exports.SignalsModule = SignalsModule;
exports.SignalsModule = SignalsModule = __decorate([
    (0, common_1.Module)({
        imports: [angel_one_module_1.AngelOneModule, scanner_module_1.ScannerModule],
        providers: [
            technical_engine_service_1.TechnicalEngineService,
            market_structure_service_1.MarketStructureService,
            market_regime_service_1.MarketRegimeService,
            safety_layer_service_1.SafetyLayerService,
            price_action_service_1.PriceActionService,
            signal_generator_service_1.SignalGeneratorService,
        ],
        controllers: [signals_controller_1.SignalsController],
        exports: [signal_generator_service_1.SignalGeneratorService],
    })
], SignalsModule);
//# sourceMappingURL=signals.module.js.map