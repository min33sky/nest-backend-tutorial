import { Controller, Get } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CommonService } from './common/common.service';
import { ServiceB } from './service-B';

@Controller()
export class AppController {
  constructor(
    private readonly serviceB: ServiceB,
    private readonly commonService: CommonService,
    private readonly configService: ConfigService,
  ) {}

  @Get('/db-host-from-config')
  getDatabaseHostFromConfigService() {
    return this.configService.get('DATABASE_HOST');
  }

  @Get('/serviceB')
  getHelloB(): string {
    return this.serviceB.getHello();
  }

  @Get('/common-hello')
  getCommonHello() {
    // AppModule -> CoreModule -> CommonModule 의존 관계
    return this.commonService.hello();
  }
}
