import { Body, Controller, Delete, Get, HttpCode, Patch, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { UserService } from './providers/users.service';
import { ActiveUser } from 'src/auth/decorators/active-user.decorator';
import { ActiveUserData } from 'src/auth/interfaces/active-user-data.interface';
import { UpdateUserProfileDto } from './dtos/update-user-profile.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { FavoriteListIdDto } from './dtos/favorite-list-id.dto';

@Controller('user')
export class UserController {
    constructor(
        private readonly userService: UserService,
    ) { }


    @Get('/profile')
    @HttpCode(200)
    async getMyProfile(
        @ActiveUser() user: ActiveUserData,
    ) {
        return this.userService.getUserProfile(user.sub);
    }

    @Patch('/profile')
    @HttpCode(200)
    @UseInterceptors(FileInterceptor('file')) // 'file' should be the name of the field in the request body
    async updateMyProfile(
        @ActiveUser() user: ActiveUserData,
        @Body() updateUserProfileDto: UpdateUserProfileDto,
        @UploadedFile() file?: Express.Multer.File
    ) {
        return this.userService.updateUserProfile(user.sub, updateUserProfileDto, file);
    }


    @Post('/change-role')
    @HttpCode(200)
    async changeMyRole(
        @ActiveUser() user: ActiveUserData,
    ) {
        return this.userService.changeRoleForHavingARealEstateOffice(user.sub);
    }

    @Get('/get-my-favorite-list')
    @HttpCode(200)
    async getMyFavoriteList(
        @ActiveUser() user: ActiveUserData,
    ) {
        return this.userService.getAllPropertiesInMyFavoriteList(user.sub);
    }


    @Post('/add-for-favorite-list')
    @HttpCode(200)
    async addToFavoriteList(
        @ActiveUser() user: ActiveUserData,
        @Body() { propertyId }: FavoriteListIdDto,
    ) {
        return this.userService.addPropertyToUserFavoriteList(user.sub, propertyId);
    }

    @Post('/remove-from-favorite-list')
    @HttpCode(200)
    async removeFromFavoriteList(
        @ActiveUser() user: ActiveUserData,
        @Body() { propertyId }: FavoriteListIdDto,
    ) {
        return this.userService.removePropertyFromUserFavoriteList(user.sub, propertyId);
    }


    @Delete('/profile')
    @HttpCode(200)
    async deleteMyProfile(
        @ActiveUser() user: ActiveUserData,
    ) {
        return this.userService.deleteUserProfileData(user.sub);
    }



}
