import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersEntity } from './users.entity';
import { Repository } from 'typeorm';
import { RegisterDTO } from 'src/auth/dto/register.dto';
import Joi from 'joi';

@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(UsersEntity)
        private readonly repository: Repository<UsersEntity>,
    ){}

    private logger = new Logger('UsersService');

    async findByLogin(login: string){
        return await this.repository.findOne({where: {login}})
        .catch(err => this.logger.error(err.message));
    }

    async isExistUser(login: string){
        const user: number | void = await this.repository.count({where: {login}})
            .catch(err => this.logger.error(err.message))

        return user ? true : false
    }

    async rigisterUser(registerDTO: RegisterDTO){
        return await this.repository.save(Object.assign(new UsersEntity, registerDTO))
            .catch(err => this.logger.error(err.message))
    }
}
