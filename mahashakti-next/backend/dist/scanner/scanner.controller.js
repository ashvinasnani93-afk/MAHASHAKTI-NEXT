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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScannerController = void 0;
const common_1 = require("@nestjs/common");
const explosion_detector_service_1 = require("./explosion-detector.service");
let ScannerController = class ScannerController {
    constructor(explosionDetectorService) {
        this.explosionDetectorService = explosionDetectorService;
    }
    getAlerts() {
        return {
            success: true,
            data: this.explosionDetectorService.getAlerts(),
        };
    }
};
exports.ScannerController = ScannerController;
__decorate([
    (0, common_1.Get)('/alerts'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ScannerController.prototype, "getAlerts", null);
exports.ScannerController = ScannerController = __decorate([
    (0, common_1.Controller)('api/scanner'),
    __metadata("design:paramtypes", [explosion_detector_service_1.ExplosionDetectorService])
], ScannerController);
//# sourceMappingURL=scanner.controller.js.map