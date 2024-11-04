import { Controller, Get, HttpCode, HttpStatus, Param, Post, UseGuards } from '@nestjs/common';
import { ExcangeRateService } from './exchangeRate.service';
import { CacheKey } from '@nestjs/cache-manager';
import { JwtAuthGuard } from 'src/auth/jwt.guard';

@Controller('rate')
export class ExcangeRateController {

    constructor(
        private readonly service: ExcangeRateService
    ){}

    @HttpCode(200)
    @UseGuards(JwtAuthGuard)
    @CacheKey('current-all')
    @Get('current-all')
    getCurrentRates(){
        return this.service.getCurrentRates();
    }

    @HttpCode(201)
    @Post('update-all')
    updateRates(){
        return this.service.updateRates();
    }

    @HttpCode(200)
    @CacheKey('one-rate')
    @Get('one/:rate')
    async getOneRateByCharCode(@Param('rate') rate: string){
        console.log(rate)
        return await this.service.getOneRateByCharCode(rate);
    }

    @HttpCode(200)
    @CacheKey('all-rate')
    @Get('all/:rate')
    async getRatesByCharCode(@Param('rate') rate: string){
        return await this.service.getRatesByCharCode(rate);
    }
}
