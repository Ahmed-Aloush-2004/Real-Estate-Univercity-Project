import { forwardRef, Module } from '@nestjs/common';
import { UserService } from './providers/users.service';
import { AuthModule } from 'src/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserController } from './user.controller';
import { UserProfileProvider } from './providers/user-profile.provider';
import { PhotoModule } from 'src/photo/photo.module';
import { FavoritePropertiesForUser } from './providers/favorite-properties-for-user';
import { UserPhoto } from './entities/user-photo.entity';

@Module({
    imports: [
        forwardRef(() => AuthModule),
        TypeOrmModule.forFeature([User,UserPhoto]),
        PhotoModule,
    ],
    providers: [
        UserService,
        UserProfileProvider,
        FavoritePropertiesForUser,
    ],
    controllers: [UserController,],
    exports: [UserService],
})
export class UserModule { }
