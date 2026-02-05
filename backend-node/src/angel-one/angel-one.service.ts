import { Injectable, Logger } from '@nestjs/common';
import { SmartAPI } from 'smartapi-javascript';
import { authenticator } from 'otplib';
import { ConfigService } from '../config/config.service';

@Injectable()
export class AngelOneService {
  private readonly logger = new Logger(AngelOneService.name);
  private smartApi: any;
  private authToken: string;
  private refreshToken: string;
  private feedToken: string;
  private isLoggedIn = false;

  constructor(private configService: ConfigService) {}

  async login(): Promise<boolean> {
    try {
      this.smartApi = new SmartAPI({
        api_key: this.configService.angelApiKey,
      });

      // Generate TOTP
      const totp = authenticator.generate(this.configService.angelTotpSecret);

      // Login
      const loginResponse = await this.smartApi.generateSession(
        this.configService.angelClientId,
        this.configService.angelPassword,
        totp,
      );

      if (loginResponse.status) {
        this.authToken = loginResponse.data.jwtToken;
        this.refreshToken = loginResponse.data.refreshToken;
        this.feedToken = loginResponse.data.feedToken;
        this.isLoggedIn = true;

        this.logger.log('✅ Angel One login successful');
        return true;
      } else {
        this.logger.error(`❌ Angel One login failed: ${loginResponse.message}`);
        return false;
      }
    } catch (error) {
      this.logger.error(`❌ Angel One login exception: ${error.message}`);
      return false;
    }
  }

  async getProfile() {
    try {
      if (!this.isLoggedIn) {
        await this.login();
      }
      return await this.smartApi.getProfile(this.refreshToken);
    } catch (error) {
      this.logger.error(`Error getting profile: ${error.message}`);
      return null;
    }
  }

  async getLTP(exchange: string, tradingSymbol: string, symbolToken: string) {
    try {
      if (!this.isLoggedIn) {
        await this.login();
      }

      const ltpData = await this.smartApi.ltpData(exchange, tradingSymbol, symbolToken);
      return ltpData;
    } catch (error) {
      this.logger.error(`Error getting LTP: ${error.message}`);
      return null;
    }
  }

  async getMarketData(mode: string, exchangeTokens: any) {
    try {
      if (!this.isLoggedIn) {
        await this.login();
      }

      return await this.smartApi.getMarketData(mode, exchangeTokens);
    } catch (error) {
      this.logger.error(`Error getting market data: ${error.message}`);
      return null;
    }
  }

  getFeedToken(): string {
    return this.feedToken;
  }

  getSmartApi() {
    return this.smartApi;
  }

  isAuthenticated(): boolean {
    return this.isLoggedIn;
  }
}
