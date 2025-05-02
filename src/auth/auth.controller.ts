import { Body, Controller, HttpCode, HttpStatus, Post, Req } from '@nestjs/common';
import { AuthService } from './providers/auth.service';
import { CreateUserDto } from 'src/user/dtos/create-user.dto';
import { LoginDto } from './dtos/login.dto';
import { RefreshTokenDto } from './dtos/refresh-token.dto';
import { Auth } from './decorators/auth.decorator';
import { AuthType } from './enums/auth-type.enum';
import { ActiveUser } from './decorators/active-user.decorator';
import { ActiveUserData } from './interfaces/active-user-data.interface';

@Controller('auth')
@Auth(AuthType.None)
export class AuthController {
    constructor(
        private readonly authService: AuthService,
    ) { }

    @Post('/register')
    @HttpCode(200)
    async register(@Body() createUserDto: CreateUserDto) {
        return this.authService.register(createUserDto);
    }

    @Post('/login')
    @HttpCode(200)
    async login(@Body() loginDto: LoginDto) {
        return this.authService.login(loginDto);
    }


    @Post('refresh-token')
    @HttpCode(200)
    async refreshTokens(@ActiveUser() user:ActiveUserData,@Body() refreshTokenDto:RefreshTokenDto){
            
        return await this.authService.refreshTokens(refreshTokenDto)
    }
}
