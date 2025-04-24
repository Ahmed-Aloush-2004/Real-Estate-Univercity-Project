import { forwardRef, Module } from '@nestjs/common';
import { UserService } from './providers/users.service';
import { AuthModule } from 'src/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserController } from './user.controller';
import { UserProfileProvider } from './providers/user-profile.provider';
import { PhotoModule } from 'src/photo/photo.module';

@Module({
    imports: [
        forwardRef(() => AuthModule),
        TypeOrmModule.forFeature([User]),
        PhotoModule,
    ],
    providers: [
        UserService,
        UserProfileProvider,
    ],
    controllers: [UserController,],
    exports: [UserService],
})
export class UserModule { }
