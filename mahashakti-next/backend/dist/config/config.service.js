"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfigService = void 0;
const common_1 = require("@nestjs/common");
const dotenv = __importStar(require("dotenv"));
dotenv.config();
let ConfigService = class ConfigService {
    get angelApiKey() {
        return process.env.ANGEL_API_KEY || '';
    }
    get angelClientId() {
        return process.env.ANGEL_CLIENT_ID || '';
    }
    get angelPassword() {
        return process.env.ANGEL_PASSWORD || '';
    }
    get angelTotpSecret() {
        return process.env.ANGEL_TOTP_SECRET || '';
    }
    get mongoUrl() {
        return process.env.MONGO_URL || 'mongodb://localhost:27017';
    }
    get dbName() {
        return process.env.DB_NAME || 'mahashakti_db';
    }
    get port() {
        return parseInt(process.env.PORT || '3000', 10);
    }
    get corsOrigins() {
        return process.env.CORS_ORIGINS || '*';
    }
    get scannerInterval() {
        return parseInt(process.env.SCANNER_INTERVAL || '2000', 10);
    }
    get cacheDuration() {
        return parseInt(process.env.CACHE_DURATION || '300000', 10);
    }
    get vixThreshold() {
        return parseFloat(process.env.VIX_THRESHOLD || '25');
    }
    get explosionPriceChange() {
        return parseFloat(process.env.EXPLOSION_PRICE_CHANGE || '40');
    }
    get explosionVolumeSpike() {
        return parseFloat(process.env.EXPLOSION_VOLUME_SPIKE || '5');
    }
    get explosionOiChange() {
        return parseFloat(process.env.EXPLOSION_OI_CHANGE || '15');
    }
    get explosionIvChange() {
        return parseFloat(process.env.EXPLOSION_IV_CHANGE || '10');
    }
    get explosionScoreThreshold() {
        return parseInt(process.env.EXPLOSION_SCORE_THRESHOLD || '8', 10);
    }
    getStrikeRange(symbol) {
        if (symbol.includes('NIFTY') && !symbol.includes('BANK'))
            return 30;
        if (symbol.includes('BANKNIFTY'))
            return 40;
        if (symbol.includes('FINNIFTY'))
            return 30;
        return 20;
    }
};
exports.ConfigService = ConfigService;
exports.ConfigService = ConfigService = __decorate([
    (0, common_1.Injectable)()
], ConfigService);
//# sourceMappingURL=config.service.js.map