import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PropertyTypeService } from './propertyType.service';
import { CreatePropertyTypeDto } from './dto/create-propertyType.dto';
import { UpdatePropertyTypeDto } from './dto/update-propertyType.dto';
import { CreateAttributeDto } from 'src/attribute/dto/create-attribute.dto';

@Controller('propertyType')
export class PropertyTypeController {
  constructor(private readonly propertyTypeService: PropertyTypeService) {}

  @Post()
  public createPropertyType(@Body() createPropertyTypeDto: CreatePropertyTypeDto){
    return this.propertyTypeService.createPropertyType(createPropertyTypeDto);
  }

  @Post(':id')
  public addAttributesToPropertyType(@Param("id") id , @Body() createAttributeDto: CreateAttributeDto){
    return this.propertyTypeService.addAttributeToPropertyType(id , createAttributeDto);
  }

  @Get(':id')
  public getPropertyType(@Param("id") id){
    return this.propertyTypeService.getPropertyType(id);
  }

  @Get('/typeAttributes/:id')
  public getPropertyTypeAttributes(@Param("id") id ){
    return this.propertyTypeService.getPropertyTypeAttributes(id);
  }

  @Get()
  public getAllTypes(){
    return this.propertyTypeService.getAllTypes();
  }
}