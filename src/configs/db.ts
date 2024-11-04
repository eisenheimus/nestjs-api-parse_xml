import { ConfigModule, ConfigService } from "@nestjs/config"
import { TypeOrmModuleAsyncOptions } from "@nestjs/typeorm";
import { ExchangeRateEntity } from "src/exchangeRate/exchangeRate.entity";
import { UsersEntity } from "src/users/users.entity";

const dbConfig = (): TypeOrmModuleAsyncOptions =>  ({
    imports: [ConfigModule],
    useFactory: (config: ConfigService) => {
      return {
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        username: config.get('DB_USERNAME'),
        password: config.get('DB_PASSWORD'),
        schema: config.get('DB_SCHEMA'),
        database: config.get('DB_NAME'),
        entities: [
          ExchangeRateEntity,
          UsersEntity,
        ],
        synchronize: true,
      }
    },
    inject: [ConfigService],
})

export default dbConfig;