import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { PropertyAttributeService } from './property-attribute.service';
import { CreatePropertyAttributeDto } from './dto/create-property-attribute.dto';
import { UpdatePropertyAttributeDto } from './dto/update-property-attribute.dto';

@Controller('property-attributes')
export class PropertyAttributeController {
  constructor(private readonly service: PropertyAttributeService) {}

  // إنشاء جديد
  @Post()
  create(@Body() dto: CreatePropertyAttributeDto) {
    return this.service.create(dto);
  }

  // جلب الكل
  @Get()
  findAll() {
    return this.service.findAll();
  }

  // جلب عنصر محدد
  @Get(':id')
  findOne(
    @Param('id',) id: string,
  ) {
    return this.service.findOne(id);
  }

  // تحديث
  @Patch(':id')
  update(
    @Param('id',) id: string,
    @Body() dto: UpdatePropertyAttributeDto,
  ) {
    return this.service.update(id, dto);
  }

  // حذف
  @Delete(':id')
  remove(
    @Param('id',) id: string,  
  ) {
    return this.service.remove(id);
  }
}
