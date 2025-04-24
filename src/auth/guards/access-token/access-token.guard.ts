import { CanActivate, ExecutionContext, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import jwtConfig from 'src/auth/config/jwt.config';

@Injectable()
export class AccessTokenGuard implements CanActivate {

  constructor(
    private readonly jwtService: JwtService,

    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
  ) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();

    // Extract token from header
    const token = this.extractRequestFromHeader(request);

    try {
      // Verify token
      const payload = await this.jwtService.verifyAsync(
        token,
        {
          secret: this.jwtConfiguration.secret,  // Ensure the secret or publicKey is passed
          ...this.jwtConfiguration,  // Spread any other config options
        },
      );

      // Attach the payload to the request
      request['user'] = payload;

      // If everything is good, allow access
      return true;
    } catch (error) {
      // Catch any errors from token verification
      throw new UnauthorizedException('Invalid or expired token');
    }
  }

  private extractRequestFromHeader(request: Request): string {
    const authHeader = request.headers.authorization;
    if (!authHeader) {
      throw new UnauthorizedException('Authorization header is missing');
    }

    const [scheme, token] = authHeader.split(' ');
    if (scheme !== 'Bearer' || !token) {
      throw new UnauthorizedException('Invalid token format');
    }

    return token;
  }
}
