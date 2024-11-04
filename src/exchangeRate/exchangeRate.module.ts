import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ExcangeRateService } from './exchangeRate.service';
import { ExcangeRateController } from './exchangeRate.controller';
import { TranscoderModule } from 'src/transcoder/transcoder.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExchangeRateEntity } from './exchangeRate.entity';

@Module({
    imports: [
        HttpModule,
        TranscoderModule,
        TypeOrmModule.forFeature([ExchangeRateEntity])
    ],
    providers: [
        ExcangeRateService
    ],
    controllers: [
        ExcangeRateController
    ],
    exports: [
        ExcangeRateService
    ]
})
export class ExcangeRateModule {}
