import { forwardRef, Module } from '@nestjs/common';
import { UsersService } from './providers/users.service';
import { AuthModule } from 'src/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserController } from './user.controller';
import { UserProfileProvider } from './providers/user-profile.provider';
import { UploadsModule } from 'src/uploads/uploads.module';

@Module({
    imports: [
        forwardRef(() => AuthModule),
        TypeOrmModule.forFeature([User]),
        UploadsModule,
    ],
    providers: [
        UsersService,
        UserProfileProvider,
    ],
    controllers: [UserController,],
    exports: [UsersService],
})
export class UsersModule { }
