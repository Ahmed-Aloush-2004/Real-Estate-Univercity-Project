import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { GenerateTokenProvider } from './generate-token.provider';
import { UsersService } from 'src/users/providers/users.service';
import { CreateUserDto } from '../../users/dtos/create-user.dto';
import { User } from 'src/users/user.entity';
import { LoginDto } from '../dtos/login.dto';
import { LoginProvider } from './login.provider';
import { RefreshTokensProvider } from './refresh-tokens.provider';
import { RefreshTokenDto } from '../dtos/refresh-token.dto';

@Injectable()
export class AuthService {
    constructor(
        @Inject(forwardRef(() => UsersService))
        private readonly usersService: UsersService,

        private readonly generateTokenProvider: GenerateTokenProvider,

        private readonly loginProvider: LoginProvider,

        private readonly refreshTokenProvider:RefreshTokensProvider
    ) { }


    public async register(createUserDto: CreateUserDto) {

        let user = await this.usersService.createUser(createUserDto);

        return await this.generateTokenProvider.generateTokens(user);

    }


    public async login(loginDto: LoginDto) {

        return await this.loginProvider.login(loginDto)
    }

    public async refreshTokens(refreshTokenDto:RefreshTokenDto){
        return await this.refreshTokenProvider.refreshTokens(refreshTokenDto)
    }
}
