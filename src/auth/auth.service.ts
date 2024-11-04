import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { RegisterDTO } from './dto/register.dto';
import { UsersService } from 'src/users/users.service';
import { UsersEntity } from 'src/users/users.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService
        
    ){}
    
    async register(registerDTO: RegisterDTO){
        const isExistUSer: boolean = await this.usersService.isExistUser(registerDTO.login);

        if(isExistUSer) throw new ConflictException;

        registerDTO.password = await bcrypt.hash(registerDTO.password, 10)

        return await this.usersService.rigisterUser(registerDTO)
    }

    async login(loginDTO){
        const user: UsersEntity|void = await this.usersService.findByLogin(loginDTO.login);

        if(!user) throw new NotFoundException();

        const isAllow = await bcrypt.compare(loginDTO.password, user.password)

        if(isAllow) {
            return {token: this.jwtService.sign({login: user.login}), login: user.login }
        }

    }
}
