import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ServiceB } from './service-B';
import { ServiceA } from './service-A';
import { CoreModule } from './core/core.module';
import { ConfigModule } from '@nestjs/config';
import emailConfig from './config/emailConfig';
import { validationSchema } from './config/validationSchema';

//? CoreModule은 CommonModule을 export하고 있다. 그래서 CoreModule을 import하면 CommonModule 역시 사용할 수 있다.

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [`${__dirname}/config/env/.${process.env.NODE_ENV}.env`],
      load: [emailConfig],
      isGlobal: true,
      validationSchema,
    }),
    CoreModule,
  ],
  controllers: [AppController],
  providers: [ServiceB, ServiceA],
})
export class AppModule {}
