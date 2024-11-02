import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { CacheKey } from '@nestjs/cache-manager';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // @CacheKey('main-get')
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
