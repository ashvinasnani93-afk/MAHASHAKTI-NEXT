import { SignalGeneratorService } from './signal-generator.service';
export declare class SignalsController {
    private signalGeneratorService;
    constructor(signalGeneratorService: SignalGeneratorService);
    getSignals(symbol?: string): {
        success: boolean;
        data: import("./signal-generator.service").Signal[];
    };
}
