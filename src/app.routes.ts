import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RouterModule } from '@nestjs/core';
import { ExcangeRateModule } from './exchangeRate/exchangeRate.module';


@Module({
  imports: [
    RouterModule.register([
      {
        path: 'excange',
        module: ExcangeRateModule,
      }
    ])
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppRoutesModule {}

