import { Injectable } from '@nestjs/common';
import { CreatePropertyAttributeDto } from './dto/create-property_attribute.dto';
import { UpdatePropertyAttributeDto } from './dto/update-property_attribute.dto';

@Injectable()
export class PropertyAttributesService {
  create(createPropertyAttributeDto: CreatePropertyAttributeDto) {
    return 'This action adds a new propertyAttribute';
  }

  findAll() {
    return `This action returns all propertyAttributes`;
  }

  findOne(id: number) {
    return `This action returns a #${id} propertyAttribute`;
  }

  update(id: number, updatePropertyAttributeDto: UpdatePropertyAttributeDto) {
    return `This action updates a #${id} propertyAttribute`;
  }

  remove(id: number) {
    return `This action removes a #${id} propertyAttribute`;
  }
}
