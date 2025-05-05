import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ActiveUser } from 'src/auth/decorators/active-user.decorator';
import { ActiveUserData } from 'src/auth/interfaces/active-user-data.interface';
import { CreateOfficeCommentDto } from './dtos/create-office-comment.dto';
import { OfficeCommentService } from './office-comment.service';
import { UpdateOfficeCommentDto } from './dtos/update-office-comment.dto';

@Controller('office-comment')
export class OfficeCommentController {

    constructor(
        private readonly officeCommentService:OfficeCommentService,
    ){}

    

    @Get('/specific-office/:id')
    async getAllCommentsForThisProperty(
        @Param('id') id:string,
    ){
        return await this.officeCommentService.getAllCommentsForThisOffice(id);
    }

    @Post()
    async createCommentForProperty(
        @ActiveUser() user:ActiveUserData,
        @Body() createOfficeCommentDto:CreateOfficeCommentDto,
    ){
        return await this.officeCommentService.createCommentForOffice(user.sub,createOfficeCommentDto);
    }


    @Patch(':id')
    async updateComment(
        @Param('id') id:string,
        @ActiveUser() user:ActiveUserData,
        @Body() updateOfficeCommentDto:UpdateOfficeCommentDto,
    ){
        return await this.officeCommentService.updateComment(user.sub,id,updateOfficeCommentDto);
    }


    @Delete(':id')
    async deleteComment(
        @Param('id') id:string,
        @ActiveUser() user:ActiveUserData,
    ){
        return await this.officeCommentService.deleteComment(user.sub,id);
    }
}
