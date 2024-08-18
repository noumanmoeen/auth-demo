import { Controller, Get } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Controller('health')
export class HealthController {
  constructor(private configService: ConfigService) {}

  @Get()
  checkHealth(): { status: string; port: number } {
    const port = this.configService.get<number>('config.port') || 3000;
    return {
      status: 'Server is running',
      port: port
    };
  }
}