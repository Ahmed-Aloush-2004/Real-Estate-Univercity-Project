import { Injectable } from '@nestjs/common';
import { CreatePropertyCommentDto } from './dto/create-property_comment.dto';
import { UpdatePropertyCommentDto } from './dto/update-property_comment.dto';

@Injectable()
export class PropertyCommentsService {
  create(createPropertyCommentDto: CreatePropertyCommentDto) {
    return 'This action adds a new propertyComment';
  }

  findAll() {
    return `This action returns all propertyComments`;
  }

  findOne(id: number) {
    return `This action returns a #${id} propertyComment`;
  }

  update(id: number, updatePropertyCommentDto: UpdatePropertyCommentDto) {
    return `This action updates a #${id} propertyComment`;
  }

  remove(id: number) {
    return `This action removes a #${id} propertyComment`;
  }
}
