import { HttpModule, HttpService } from '@nestjs/axios';
import { Injectable, Module } from '@nestjs/common';
import * as converter from 'xml-js'
import {decode} from 'iconv-lite'

@Injectable()
export class ExcangeRateService {
    constructor(
        private readonly httpService: HttpService
    ){}
    axios = this.httpService.axiosRef;
    url = 'http://www.cbr.ru/scripts/XML_daily.asp'

    async getAll(){

        const response = (await this.axios.get(this.url, {
            responseType: 'arraybuffer'
        }));

        const headers = response.headers;

        console.log(headers)

        const xml = decode(Buffer.from(response.data), 'windows-1251');
        return converter.xml2json(xml);
    }
}