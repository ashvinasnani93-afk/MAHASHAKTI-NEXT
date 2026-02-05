"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AngelOneModule = void 0;
const common_1 = require("@nestjs/common");
const angel_one_service_1 = require("./angel-one.service");
const symbol_master_service_1 = require("./symbol-master.service");
const websocket_stream_service_1 = require("./websocket-stream.service");
let AngelOneModule = class AngelOneModule {
};
exports.AngelOneModule = AngelOneModule;
exports.AngelOneModule = AngelOneModule = __decorate([
    (0, common_1.Module)({
        providers: [angel_one_service_1.AngelOneService, symbol_master_service_1.SymbolMasterService, websocket_stream_service_1.WebSocketStreamService],
        exports: [angel_one_service_1.AngelOneService, symbol_master_service_1.SymbolMasterService, websocket_stream_service_1.WebSocketStreamService],
    })
], AngelOneModule);
//# sourceMappingURL=angel-one.module.js.map