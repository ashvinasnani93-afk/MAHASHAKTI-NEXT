import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { MongoClient, Db } from 'mongodb';
import { ConfigService } from '../config/config.service';

@Injectable()
export class DatabaseService implements OnModuleInit, OnModuleDestroy {
  private client: MongoClient;
  private db: Db;

  constructor(private configService: ConfigService) {}

  async onModuleInit() {
    await this.connect();
  }

  async onModuleDestroy() {
    await this.disconnect();
  }

  private async connect() {
    try {
      this.client = new MongoClient(this.configService.mongoUrl);
      await this.client.connect();
      this.db = this.client.db(this.configService.dbName);
      console.log('✅ MongoDB connected');
    } catch (error) {
      console.error('❌ MongoDB connection error:', error);
    }
  }

  private async disconnect() {
    if (this.client) {
      await this.client.close();
      console.log('MongoDB disconnected');
    }
  }

  getDb(): Db {
    return this.db;
  }
}
