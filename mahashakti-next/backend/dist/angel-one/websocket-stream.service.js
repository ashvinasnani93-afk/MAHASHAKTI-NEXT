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
var WebSocketStreamService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebSocketStreamService = void 0;
const common_1 = require("@nestjs/common");
const ws_1 = require("ws");
const angel_one_service_1 = require("./angel-one.service");
let WebSocketStreamService = WebSocketStreamService_1 = class WebSocketStreamService {
    constructor(angelOneService) {
        this.angelOneService = angelOneService;
        this.logger = new common_1.Logger(WebSocketStreamService_1.name);
        this.ws = null;
        this.isConnected = false;
        this.subscribers = new Map();
    }
    async connect() {
        try {
            if (!this.angelOneService.isAuthenticated()) {
                await this.angelOneService.login();
            }
            const feedToken = this.angelOneService.getFeedToken();
            const clientCode = this.angelOneService['configService'].angelClientId;
            const wsUrl = `wss://smartapisocket.angelone.in/smart-stream`;
            this.ws = new ws_1.WebSocket(wsUrl);
            this.ws.on('open', () => {
                this.logger.log('✅ WebSocket connected');
                this.isConnected = true;
                this.ws?.send(JSON.stringify({
                    action: 'subscribe',
                    params: {
                        mode: 1,
                        tokenList: [],
                    },
                }));
            });
            this.ws.on('message', (data) => {
                this.handleMessage(data);
            });
            this.ws.on('error', (error) => {
                this.logger.error(`WebSocket error: ${error.message}`);
            });
            this.ws.on('close', () => {
                this.logger.warn('WebSocket disconnected');
                this.isConnected = false;
                setTimeout(() => this.connect(), 5000);
            });
            return true;
        }
        catch (error) {
            this.logger.error(`WebSocket connection error: ${error.message}`);
            return false;
        }
    }
    subscribe(tokens, callback) {
        tokens.forEach((token) => {
            if (!this.subscribers.has(token)) {
                this.subscribers.set(token, []);
            }
            this.subscribers.get(token)?.push(callback);
        });
        if (this.isConnected && this.ws) {
            this.ws.send(JSON.stringify({
                action: 'subscribe',
                params: {
                    mode: 1,
                    tokenList: tokens.map((t) => ({ exchangeType: 2, tokens: [t] })),
                },
            }));
        }
    }
    handleMessage(data) {
        try {
            const tickData = {
                token: '',
                ltp: 0,
                volume: 0,
                oi: 0,
                timestamp: Date.now(),
            };
            const callbacks = this.subscribers.get(tickData.token);
            if (callbacks) {
                callbacks.forEach((cb) => cb(tickData));
            }
        }
        catch (error) {
            this.logger.error(`Error handling message: ${error.message}`);
        }
    }
    disconnect() {
        if (this.ws) {
            this.ws.close();
            this.ws = null;
            this.isConnected = false;
        }
    }
};
exports.WebSocketStreamService = WebSocketStreamService;
exports.WebSocketStreamService = WebSocketStreamService = WebSocketStreamService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [angel_one_service_1.AngelOneService])
], WebSocketStreamService);
//# sourceMappingURL=websocket-stream.service.js.map