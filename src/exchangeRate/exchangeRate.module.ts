import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ExcangeRateService } from './exchangeRate.service';
import { ExcangeRateController } from './exchangeRate.controller';

@Module({
    imports: [
        HttpModule
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
