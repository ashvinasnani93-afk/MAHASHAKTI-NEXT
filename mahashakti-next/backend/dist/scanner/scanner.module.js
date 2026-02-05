"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScannerModule = void 0;
const common_1 = require("@nestjs/common");
const angel_one_module_1 = require("../angel-one/angel-one.module");
const option_universe_service_1 = require("./option-universe.service");
const strike_filter_service_1 = require("./strike-filter.service");
const option_cache_service_1 = require("./option-cache.service");
const explosion_detector_service_1 = require("./explosion-detector.service");
const scanner_gateway_1 = require("./scanner.gateway");
const scanner_controller_1 = require("./scanner.controller");
let ScannerModule = class ScannerModule {
};
exports.ScannerModule = ScannerModule;
exports.ScannerModule = ScannerModule = __decorate([
    (0, common_1.Module)({
        imports: [angel_one_module_1.AngelOneModule],
        providers: [
            option_universe_service_1.OptionUniverseService,
            strike_filter_service_1.StrikeFilterService,
            option_cache_service_1.OptionCacheService,
            explosion_detector_service_1.ExplosionDetectorService,
            scanner_gateway_1.ScannerGateway,
        ],
        controllers: [scanner_controller_1.ScannerController],
        exports: [explosion_detector_service_1.ExplosionDetectorService, option_cache_service_1.OptionCacheService],
    })
], ScannerModule);
//# sourceMappingURL=scanner.module.js.map