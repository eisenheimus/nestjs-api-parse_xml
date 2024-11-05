import { Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { UsersEntity } from "src/users/users.entity";
import { UsersService } from "src/users/users.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(
        private readonly usersService: UsersService,
        private readonly configService: ConfigService,

    ) {
        super({
          jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
          secretOrKey: configService.get('JWT_SECRET'),
        });
    }

    async validate(payload: any): Promise<UsersEntity> {
        const user = await this.usersService.findByLogin(payload.sub);
        if (!user) {
          throw new UnauthorizedException();
        }
        return user;
    }
}