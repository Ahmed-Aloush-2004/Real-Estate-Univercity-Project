import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { ActiveUserData } from 'src/auth/interfaces/active-user-data.interface';
import { UserRole } from 'src/users/enums/user-role.enum';

@Injectable()
export class AccessRealEstateOfficeMethodsGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user: ActiveUserData = request.user;

    if (user.role === UserRole.Customer) {
      throw new ForbiddenException('You can\'t use this method. You have to be either an Admin or a SuperAdmin.');
    }

    return true; 
  } 
}
