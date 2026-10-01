import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('health')
  getHealth() {
    return this.appService.getHealthStatus();
  }
  
  // Optional: Also map the absolute root '/' to the health check
  @Get()
  getRoot() {
    return this.appService.getHealthStatus();
  }
}