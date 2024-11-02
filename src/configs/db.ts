import { ConfigModule, ConfigService } from "@nestjs/config"
import { TypeOrmModuleAsyncOptions } from "@nestjs/typeorm";

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
        entities: [],
        synchronize: true,
      }
    },
    inject: [ConfigService],
})

export default dbConfig;