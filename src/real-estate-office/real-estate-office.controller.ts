
// real-estate-office.controller.ts
import { Controller, Post, UseInterceptors, UploadedFile, Body, Req, Put, Param, Delete, Patch, Get } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { RealEstateOfficeService } from './real-estate-office.service';
import { CreateRealEstateOfficeDto } from './dtos/create-real-estate-office.dto';
import { UpdateRealEstateOfficeDto } from './dtos/update-real-estate-office.dto';

@Controller('real-estate-offices')
export class RealEstateOfficeController {
  constructor(private readonly service: RealEstateOfficeService) {}


  @Get(':id')
  async get(@Param('id') id: string) {
    return this.service.get(id);
  }


  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async create(@Body() dto: CreateRealEstateOfficeDto, @UploadedFile() file: Express.Multer.File, @Req() req) {
    return this.service.create(dto, file, req.user.id);
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('file'))
  async update(
    @Param('id') id: string,
    @Body() updateRealEstateOfficeDto: UpdateRealEstateOfficeDto,
    @UploadedFile() file?: Express.Multer.File
  ) {
    return this.service.update(id, updateRealEstateOfficeDto, file);
  }
  

  @Delete(':id')
  async delete(@Param('id') id: string) {
    console.log(id);
    
    return this.service.delete(id);
  }
}
