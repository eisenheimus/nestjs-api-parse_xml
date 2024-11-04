import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';

import { Module } from '@nestjs/common';
import { UsersEntity } from './users.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([UsersEntity])
    ],
    controllers: [],
    providers: [
        UsersService,],
    exports: [UsersService]
})
export class UsersModule { }
