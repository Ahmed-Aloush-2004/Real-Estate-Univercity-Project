import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ActiveUser } from 'src/auth/decorators/active-user.decorator';
import { ActiveUserData } from 'src/auth/interfaces/active-user-data.interface';
import { CreatePropertyCommentDto } from './dtos/create-property-comment.dto';
import { PropertyCommentService } from './property-comment.service';
import { UpdatePropertyCommentDto } from './dtos/update-property-comment.dto';

@Controller('property-comment')
export class PropertyCommentController {

    constructor(
        private readonly propertyCommentService:PropertyCommentService,
    ){}

    

    @Get('/specific-property/:id')
    async getAllCommentsForThisProperty(
        @Param('id') id:string,
    ){
        return await this.propertyCommentService.getAllCommentsForThisProperty(id);
    }

    @Post()
    async createCommentForProperty(
        @ActiveUser() user:ActiveUserData,
        @Body() createPropertyCommentDto:CreatePropertyCommentDto,
    ){
        return await this.propertyCommentService.createCommentForProperty(user.sub,createPropertyCommentDto);
    }


    @Patch(':id')
    async updateComment(
        @Param('id') id:string,
        @ActiveUser() user:ActiveUserData,
        @Body() updatePropertyCommentDto:UpdatePropertyCommentDto,
    ){

        return await this.propertyCommentService.updateComment(user.sub,id,updatePropertyCommentDto);
    }


    @Delete(':id')
    async deleteComment(
        @Param('id') id:string,
        @ActiveUser() user:ActiveUserData,
    ){
        return await this.propertyCommentService.deleteComment(user.sub,id);
    }
}
