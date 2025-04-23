import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './providers/auth.service';
import { ConfigModule } from '@nestjs/config';
import { AuthController } from './auth.controller';
import { BcryptProvider } from './providers/bcrypt.provider';
import jwtConfig from './config/jwt.config';
import { HashingProvider } from './providers/hashing.provider';
import { GenerateTokenProvider } from './providers/generate-token.provider';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { LoginProvider } from './providers/login.provider';
import { RefreshTokensProvider } from './providers/refresh-tokens.provider';
import { AccessTokenGuard } from './guards/access-token/access-token.guard';
import { AccessRealEstateOfficeMethodsGuard } from './guards/access-real-estate-office-methods/access-real-estate-office-methods.guard';

@Module({
  imports: [
    ConfigModule.forFeature(jwtConfig),
    forwardRef(() => UsersModule),
    JwtModule.registerAsync(jwtConfig.asProvider())

  ],

  providers: [
    AuthService,
    {
      provide: HashingProvider,
      useClass: BcryptProvider,
    },
    GenerateTokenProvider,
    LoginProvider,
    RefreshTokensProvider,
    AccessTokenGuard, // <-- Export here too
    AccessRealEstateOfficeMethodsGuard,

  ],
  controllers: [AuthController],
  exports: [
    AuthService,
    {
      provide: HashingProvider,
      useClass: BcryptProvider,
    },
    GenerateTokenProvider,
    LoginProvider,
    RefreshTokensProvider,
    AccessTokenGuard, // <-- Export here too
    AccessRealEstateOfficeMethodsGuard,
  ],
})
export class AuthModule { }
