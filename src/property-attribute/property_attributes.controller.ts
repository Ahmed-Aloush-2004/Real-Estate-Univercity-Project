import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PropertyAttributesService } from './property_attributes.service';
import { CreatePropertyAttributeDto } from './dto/create-property_attribute.dto';
import { UpdatePropertyAttributeDto } from './dto/update-property_attribute.dto';

@Controller('property-attributes')
export class PropertyAttributesController {
  constructor(private readonly propertyAttributesService: PropertyAttributesService) {}

  @Post()
  create(@Body() createPropertyAttributeDto: CreatePropertyAttributeDto) {
    return this.propertyAttributesService.create(createPropertyAttributeDto);
  }

  @Get()
  findAll() {
    return this.propertyAttributesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.propertyAttributesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePropertyAttributeDto: UpdatePropertyAttributeDto) {
    return this.propertyAttributesService.update(+id, updatePropertyAttributeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.propertyAttributesService.remove(+id);
  }
}
