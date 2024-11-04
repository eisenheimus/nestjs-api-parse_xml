import { HttpService } from '@nestjs/axios';
import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { TranscoderService } from 'src/transcoder/transcoder.service';
import { AxiosResponse } from 'axios';
import { Cron, CronExpression } from '@nestjs/schedule';
import { ExchangeRateEntity } from './exchangeRate.entity';
import { In, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ExcangeRateService {
    constructor(
        private readonly httpService: HttpService,
        private readonly converter: TranscoderService,
        
        @InjectRepository(ExchangeRateEntity)
        private readonly repository: Repository<ExchangeRateEntity>
    ){}

    private axios = this.httpService.axiosRef;
    private url = 'http://www.cbr.ru/scripts/XML_daily.asp';
    private logger = new Logger('ExcangeRateService');

    @Cron(CronExpression.EVERY_5_HOURS)
    saveDataRateOnSchedule(){
        console.log('cron start')
        this.getXml()
            .then(xml => this.converter.xmlToObj(xml))
            .then(o => o?.ValCurs?.Valute)
            .then(o => this.toEntities(o))
            .then(entities => this.repository.save(entities))
    }

    toEntities(o){
        return  o.map(o => Object.assign(new ExchangeRateEntity, o))
    }

    getXml(): Promise<string | void> {
        return this.axios.get(this.url, {responseType: 'arraybuffer'})
            .then( (response: AxiosResponse ) => {
                const encoding: string = response?.headers['content-type'].match(/charset=.+/)?.[0].replace(/charset=/g, '')
                return this.converter.toCharset(response.data, encoding)
                
            })
            .catch( err => {
                this.logger.error(err.message)
                throw new InternalServerErrorException();
            })
    }

    saveData(entities: ExchangeRateEntity[]){
        return this.repository.save(entities)
            .then(e => e)
    }
    
    getCurrentRates(){
        return this.repository
            .createQueryBuilder()
            .select('"charCode"')
            .groupBy('"charCode"')
            .getRawMany()
            .then(rows => rows.map(r => r?.['charCode']) )
            .then(arr => {
                return this.repository.find({
                    where: {
                        CharCode: In(arr),                        
                    },
                    order: {
                        createdAt: 'DESC'
                    },
                    take: arr.length
                })
            })
    }

    getRatesByCharCode(rate: string){
        return this.repository.find({
            where: {
                CharCode: rate
            },
            order: {
                createdAt: 'DESC'
            }
        })
    }

    getOneRateByCharCode(rate: string){
        return this.repository.findOne({
            where: {
                CharCode: rate
            },
            order: {
                createdAt: 'DESC'
            }
        })
    }

    updateRates(){
        this.saveDataRateOnSchedule()
    }




}