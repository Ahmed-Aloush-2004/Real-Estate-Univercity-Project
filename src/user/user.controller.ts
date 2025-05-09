import { Body, Controller, Delete, Get, HttpCode, Patch, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { UserService } from './providers/users.service';
import { ActiveUser } from 'src/auth/decorators/active-user.decorator';
import { ActiveUserData } from 'src/auth/interfaces/active-user-data.interface';
import { UpdateUserProfileDto } from './dtos/update-user-profile.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { Auth } from 'src/auth/decorators/auth.decorator';

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



    @Delete('/profile')
    @HttpCode(200)
    async deleteMyProfile(
        @ActiveUser() user: ActiveUserData,
    ) {
        return this.userService.deleteUserProfileData(user.sub);
    }



}
