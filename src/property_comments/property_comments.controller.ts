import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PropertyCommentsService } from './property_comments.service';
import { CreatePropertyCommentDto } from './dto/create-property_comment.dto';
import { UpdatePropertyCommentDto } from './dto/update-property_comment.dto';

@Controller('property-comments')
export class PropertyCommentsController {
  constructor(private readonly propertyCommentsService: PropertyCommentsService) {}

  @Post()
  create(@Body() createPropertyCommentDto: CreatePropertyCommentDto) {
    return this.propertyCommentsService.create(createPropertyCommentDto);
  }

  @Get()
  findAll() {
    return this.propertyCommentsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.propertyCommentsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePropertyCommentDto: UpdatePropertyCommentDto) {
    return this.propertyCommentsService.update(+id, updatePropertyCommentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.propertyCommentsService.remove(+id);
  }
}
