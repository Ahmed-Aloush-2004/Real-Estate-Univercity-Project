import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PropertyLicenseService } from './property-license.service';
import { CreatePropertyLicenseDto } from './dto/create-property-license.dto';
import { UpdatePropertyLicenseDto } from './dto/update-property-license.dto';

@Controller('property-license')
export class PropertyLicenseController {
  constructor(private readonly propertyLicenseService: PropertyLicenseService) {}

  @Post()
  create(@Body() createPropertyLicenseDto: CreatePropertyLicenseDto) {
    return this.propertyLicenseService.create(createPropertyLicenseDto);
  }

  @Get()
  findAll() {
    return this.propertyLicenseService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.propertyLicenseService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePropertyLicenseDto: UpdatePropertyLicenseDto) {
    return this.propertyLicenseService.update(+id, updatePropertyLicenseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.propertyLicenseService.remove(+id);
  }
}
