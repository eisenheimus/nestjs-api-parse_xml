import { Module } from "@nestjs/common";
import { TranscoderService } from "./transcoder.service";

@Module({
    providers: [TranscoderService],
    exports: [TranscoderService],
    imports: []

})
export class TranscoderModule{}