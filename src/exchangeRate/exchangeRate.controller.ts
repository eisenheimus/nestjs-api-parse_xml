import { HttpService } from '@nestjs/axios';
import { Controller, Get } from '@nestjs/common';
import { ExcangeRateService } from './exchangeRate.service';

@Controller('rate')
export class ExcangeRateController {

    constructor(
        private readonly service: ExcangeRateService
    ){}

    @Get()
    async getAll(){
        // return 'qwe123'
        return await this.service.getAll()
    }
}
