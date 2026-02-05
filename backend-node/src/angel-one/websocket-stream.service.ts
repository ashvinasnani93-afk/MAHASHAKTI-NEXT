import { Injectable, Logger } from '@nestjs/common';
import { WebSocket } from 'ws';
import { AngelOneService } from './angel-one.service';

interface TickData {
  token: string;
  ltp: number;
  volume: number;
  oi: number;
  timestamp: number;
}

@Injectable()
export class WebSocketStreamService {
  private readonly logger = new Logger(WebSocketStreamService.name);
  private ws: WebSocket | null = null;
  private isConnected = false;
  private subscribers: Map<string, ((data: TickData) => void)[]> = new Map();

  constructor(private angelOneService: AngelOneService) {}

  async connect(): Promise<boolean> {
    try {
      if (!this.angelOneService.isAuthenticated()) {
        await this.angelOneService.login();
      }

      const feedToken = this.angelOneService.getFeedToken();
      const clientCode = this.angelOneService['configService'].angelClientId;

      // Angel One WebSocket URL
      const wsUrl = `wss://smartapisocket.angelone.in/smart-stream`;

      this.ws = new WebSocket(wsUrl);

      this.ws.on('open', () => {
        this.logger.log('✅ WebSocket connected');
        this.isConnected = true;

        // Send authentication
        this.ws?.send(
          JSON.stringify({
            action: 'subscribe',
            params: {
              mode: 1,
              tokenList: [],
            },
          }),
        );
      });

      this.ws.on('message', (data: Buffer) => {
        this.handleMessage(data);
      });

      this.ws.on('error', (error) => {
        this.logger.error(`WebSocket error: ${error.message}`);
      });

      this.ws.on('close', () => {
        this.logger.warn('WebSocket disconnected');
        this.isConnected = false;
        // Auto reconnect after 5 seconds
        setTimeout(() => this.connect(), 5000);
      });

      return true;
    } catch (error) {
      this.logger.error(`WebSocket connection error: ${error.message}`);
      return false;
    }
  }

  subscribe(tokens: string[], callback: (data: TickData) => void) {
    tokens.forEach((token) => {
      if (!this.subscribers.has(token)) {
        this.subscribers.set(token, []);
      }
      this.subscribers.get(token)?.push(callback);
    });

    // Subscribe to tokens via WebSocket
    if (this.isConnected && this.ws) {
      this.ws.send(
        JSON.stringify({
          action: 'subscribe',
          params: {
            mode: 1,
            tokenList: tokens.map((t) => ({ exchangeType: 2, tokens: [t] })),
          },
        }),
      );
    }
  }

  private handleMessage(data: Buffer) {
    try {
      // Parse binary data from Angel One
      // This is a simplified version - actual implementation needs proper binary parsing
      const tickData: TickData = {
        token: '',
        ltp: 0,
        volume: 0,
        oi: 0,
        timestamp: Date.now(),
      };

      // Notify subscribers
      const callbacks = this.subscribers.get(tickData.token);
      if (callbacks) {
        callbacks.forEach((cb) => cb(tickData));
      }
    } catch (error) {
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
}
