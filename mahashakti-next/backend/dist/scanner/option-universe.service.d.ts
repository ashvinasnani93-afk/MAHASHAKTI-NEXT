import { OnModuleInit } from '@nestjs/common';
import { SymbolMasterService } from '../angel-one/symbol-master.service';
interface OptionUniverse {
    symbol: string;
    name: string;
    token: string;
    exchange: string;
    strike: number;
    optionType: string;
    expiry: string;
    expiryDate: string;
    lotSize: number;
}
export declare class OptionUniverseService implements OnModuleInit {
    private symbolMasterService;
    private readonly logger;
    private optionUniverse;
    constructor(symbolMasterService: SymbolMasterService);
    onModuleInit(): Promise<void>;
    loadUniverse(): Promise<void>;
    getUniverse(): OptionUniverse[];
    getByUnderlying(underlying: string): OptionUniverse[];
}
export {};
