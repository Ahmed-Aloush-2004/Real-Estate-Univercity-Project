import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { PropertyTypeAttributeService } from './propertyType-attribute.service';
import { CreatePropertyTypeAttributeDto } from './dto/create-propertyType-attribute.dto';
import { UpdatePropertyTypeAttributeDto } from './dto/update-propertyType-attribute.dto';

@Controller('property-type-attributes')
export class PropertyTypeAttributeController {
  constructor(private readonly service: PropertyTypeAttributeService) {}

  // إنشاء جديد
  @Post()
  create(@Body() dto: CreatePropertyTypeAttributeDto) {
    return this.service.create(dto);
  }

  // جلب الكل
  @Get()
  findAll() {
    return this.service.findAll();
  }

  // جلب عنصر محدد
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.service.findOne(id);
  }

  // تحديث
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdatePropertyTypeAttributeDto,
  ) {
    return this.service.update(id, dto);
  }

  // حذف
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.service.remove(id);
  }
}
