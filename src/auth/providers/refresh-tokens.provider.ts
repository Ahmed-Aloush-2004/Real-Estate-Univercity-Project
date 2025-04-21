import { forwardRef, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { GenerateTokenProvider } from './generate-token.provider';
import { UsersService } from 'src/users/providers/users.service';
import { ConfigType } from '@nestjs/config';
import jwtConfig from '../config/jwt.config';
import { JwtService } from '@nestjs/jwt';
import { RefreshTokenDto } from '../dtos/refresh-token.dto';

@Injectable()
export class RefreshTokensProvider {
    constructor(

        private readonly jwtService: JwtService,

        @Inject(jwtConfig.KEY)
        private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,

        private readonly generateTokenProvider: GenerateTokenProvider,

        @Inject(forwardRef(() => UsersService))
        private readonly usersService: UsersService,
    ) { }


    public async refreshTokens(refreshTokenDto: RefreshTokenDto) {
        try {


            const { sub } = await this.jwtService.verifyAsync(
                refreshTokenDto.refreshToken,
                {
                    secret: this.jwtConfiguration.secret,
                    issuer: this.jwtConfiguration.issuer,
                    audience: this.jwtConfiguration.audience,
                }
            );

            const user = await this.usersService.findOneUserById(sub);


            return await this.generateTokenProvider.generateTokens(user);




        } catch (error) {

            throw new UnauthorizedException(error);
        }
    }


}
