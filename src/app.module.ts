import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CacheModule } from '@nestjs/cache-manager';
import { TypeOrmModule, TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { AppRoutesModule } from './app.routes';
import dbConfig from "./configs/db"
import { ExcangeRateModule } from './exchangeRate/exchangeRate.module';
import { Transcoder } from './transcoder/transcoder.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env'
    }),
    CacheModule.register({
      isGlobal: true,
      ttl: 60,
      max: 50,
    }),
    TypeOrmModule.forRootAsync(dbConfig()),
    AuthModule,
    AppRoutesModule,
    ExcangeRateModule,
    Transcoder
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

