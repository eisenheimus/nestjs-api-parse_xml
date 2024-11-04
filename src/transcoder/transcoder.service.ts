import { Injectable, InternalServerErrorException, Logger } from "@nestjs/common";
import { decode } from "iconv-lite";
import {XMLParser, XMLBuilder} from 'fast-xml-parser';

@Injectable()
export class TranscoderService {
    private logger = new Logger('TranscoderService');

    toCharset(document: any, encoding: string){
        return  decode(Buffer.from(document), encoding );
    }

    xmlToObj(xml: any){     
        return new XMLParser().parse(xml);
    }
}