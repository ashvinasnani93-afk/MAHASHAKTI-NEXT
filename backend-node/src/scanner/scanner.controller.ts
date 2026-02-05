import { Controller, Get } from '@nestjs/common';
import { ExplosionDetectorService } from './explosion-detector.service';

@Controller('api/scanner')
export class ScannerController {
  constructor(private explosionDetectorService: ExplosionDetectorService) {}

  @Get('/alerts')
  getAlerts() {
    return {
      success: true,
      data: this.explosionDetectorService.getAlerts(),
    };
  }
}
