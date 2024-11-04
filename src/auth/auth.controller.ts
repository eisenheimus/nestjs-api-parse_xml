import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { LoginDTO } from './dto/login.dto';
import { RegisterDTO } from './dto/register.dto';
import { AuthService } from './auth.service';

@Controller()
export class AuthController { 

    constructor(
        private readonly authService: AuthService
    ){}

    @HttpCode(200)
    @Post('login')
    login(@Body() loginDTO: LoginDTO){
        return this.authService.login(loginDTO)
    }

    @HttpCode(201)
    @Post('register')
    register(@Body() registerDTO: RegisterDTO){
        return this.authService.register(registerDTO)

    }
}
