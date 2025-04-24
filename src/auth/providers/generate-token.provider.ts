import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import jwtConfig from '../config/jwt.config';
import { User } from 'src/user/user.entity';
import { ActiveUserData } from '../interfaces/active-user-data.interface';

@Injectable()
export class GenerateTokenProvider {
    constructor(

        private readonly jwtService:JwtService,

        @Inject(jwtConfig.KEY)
        private readonly jwtConfiguration:ConfigType<typeof jwtConfig>,

    ){}

    public async signToken<T>(userId:string,expiresIn:number,payload?: T){
        return await this.jwtService.signAsync(
            {
                sub:userId,
                ...payload,
            },
            {
                secret:this.jwtConfiguration.secret,
                issuer:this.jwtConfiguration.issuer,
                audience:this.jwtConfiguration.audience,
                expiresIn,
            }
        )
    }

    public async generateTokens(user:User){
        const [accessToken,refreshToken] = await Promise.all([
            // Generate The Access Token
            this.signToken<Partial<ActiveUserData>>(user.id,this.jwtConfiguration.accessTokenTtl,
                {
                    email:user.email,
                    role: user.role,
                }),
            this.signToken(
                user.id,
                this.jwtConfiguration.refreshTokenTtl,
            )    
        ])

        return {
            accessToken,
            refreshToken
        }
    }
}
