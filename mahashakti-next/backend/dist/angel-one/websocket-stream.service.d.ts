import { AngelOneService } from './angel-one.service';
interface TickData {
    token: string;
    ltp: number;
    volume: number;
    oi: number;
    timestamp: number;
}
export declare class WebSocketStreamService {
    private angelOneService;
    private readonly logger;
    private ws;
    private isConnected;
    private subscribers;
    constructor(angelOneService: AngelOneService);
    connect(): Promise<boolean>;
    subscribe(tokens: string[], callback: (data: TickData) => void): void;
    private handleMessage;
    disconnect(): void;
}
export {};
