import { Controller, Get, Inject } from '@nestjs/common';
import { AppService } from './app.service';
import { Lib1Service } from '@app/lib1';

@Controller()
export class AppController {
  @Inject(Lib1Service)
  private lib: Lib1Service;

  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('aaa')
  aaa() {
    return 'aaa' + this.lib.xxx();
  }
}
