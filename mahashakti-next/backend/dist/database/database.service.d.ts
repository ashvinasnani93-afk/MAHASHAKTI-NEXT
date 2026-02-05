import { OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { Db } from 'mongodb';
import { ConfigService } from '../config/config.service';
export declare class DatabaseService implements OnModuleInit, OnModuleDestroy {
    private configService;
    private client;
    private db;
    constructor(configService: ConfigService);
    onModuleInit(): Promise<void>;
    onModuleDestroy(): Promise<void>;
    private connect;
    private disconnect;
    getDb(): Db;
}
