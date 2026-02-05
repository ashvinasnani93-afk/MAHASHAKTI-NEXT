import { ExplosionDetectorService } from './explosion-detector.service';
export declare class ScannerController {
    private explosionDetectorService;
    constructor(explosionDetectorService: ExplosionDetectorService);
    getAlerts(): {
        success: boolean;
        data: import("./explosion-detector.service").ExplosionAlert[];
    };
}
