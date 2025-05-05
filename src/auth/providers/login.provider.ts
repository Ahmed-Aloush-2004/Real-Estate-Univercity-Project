import { forwardRef, Inject, Injectable, RequestTimeoutException, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/providers/users.service';
import { HashingProvider } from './hashing.provider';
import { LoginDto } from '../dtos/login.dto';
import { GenerateTokenProvider } from './generate-token.provider';

@Injectable()
export class LoginProvider {
    constructor(
        @Inject(forwardRef(() => UserService))
        private readonly usersService: UserService,

        private readonly hashingProvider: HashingProvider,

        private readonly generateTokenProvider: GenerateTokenProvider,
    ) { }

    public async login(loginDto: LoginDto) {

        let user = undefined;
        let isEqual = false;

        user = await this.usersService.findOneUserByEmail(loginDto.email);

        try {

            isEqual = await this.hashingProvider.comparePassword(loginDto.password, user.password);

        } catch (error) {
            throw new RequestTimeoutException(error, {
                description: 'Could not compare passwords'
            })
        }

        if (!isEqual) {
            throw new UnauthorizedException("Invalid Credintial.")
        }

        return await this.generateTokenProvider.generateTokens(user);
    }
}
