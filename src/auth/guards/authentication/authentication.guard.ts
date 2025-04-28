import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthType } from 'src/auth/enums/auth-type.enum';
import { AccessTokenGuard } from '../access-token/access-token.guard';

@Injectable() 
export class AuthenticationGuard implements CanActivate {
  private static readonly defaultAuth = AuthType.Bearer;

  constructor(
    private readonly reflector: Reflector,
    private readonly accessTokenGuard: AccessTokenGuard,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const authType: AuthType =
      this.reflector.getAllAndOverride<AuthType>('authType', [
        context.getHandler(),
        context.getClass(),
      ]) ?? AuthenticationGuard.defaultAuth;

    switch (authType) {
      case AuthType.None:        
        return true;

      case AuthType.Bearer:
        const canActivate = await this.accessTokenGuard.canActivate(context);
        if (!canActivate) {
          throw new UnauthorizedException();
        }
        return true;

      default:
        throw new UnauthorizedException('Unsupported authentication type');
    }
  }
}
