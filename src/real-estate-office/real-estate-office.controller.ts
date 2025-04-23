
// real-estate-office.controller.ts
import { Controller, Post, UseInterceptors, UploadedFile, Body, Req, Put, Param, Delete, Patch, Get, UseGuards, ParseUUIDPipe } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { RealEstateOfficeService } from './real-estate-office.service';
import { CreateRealEstateOfficeDto } from './dtos/create-real-estate-office.dto';
import { UpdateRealEstateOfficeDto } from './dtos/update-real-estate-office.dto';
import { AccessRealEstateOfficeMethodsGuard } from '../auth/guards/access-real-estate-office-methods/access-real-estate-office-methods.guard';
import { ActiveUser } from 'src/auth/decorators/active-user.decorator';
import { ActiveUserData } from 'src/auth/interfaces/active-user-data.interface';

@Controller('real-estate-offices')
export class RealEstateOfficeController {
  constructor(private readonly service: RealEstateOfficeService) { }


  @Get(':id')
  async get(
    @Param('id', ParseUUIDPipe) id: string,
    @ActiveUser() user: ActiveUserData,

  ) {
    return this.service.getRealEstateOfficeById(id);
  }


  // @Get('/me')
  // async getMyRealEstateOffice(
  //   @ActiveUser() user:ActiveUserData,
  // ) {
  //   return this.service.getMyRealEstateOffice(user.sub);
  // }

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  @UseGuards(AccessRealEstateOfficeMethodsGuard)
  async create(
    @Body() dto: CreateRealEstateOfficeDto,
    @UploadedFile() file: Express.Multer.File,
    @ActiveUser() user: ActiveUserData,
  ) {
    return this.service.create(dto, file, user.sub);
  }

  @Patch()
  @UseInterceptors(FileInterceptor('file'))
  @UseGuards(AccessRealEstateOfficeMethodsGuard)
  async update(
    // @Param('id') id: string,
    @ActiveUser() user: ActiveUserData,
    @Body() updateRealEstateOfficeDto: UpdateRealEstateOfficeDto,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    return this.service.update(user.sub, updateRealEstateOfficeDto, file);
  }

 
  @Delete('')
  @UseGuards(AccessRealEstateOfficeMethodsGuard)
  async delete(
    @ActiveUser() user:ActiveUserData,
  ) { 
   return this.service.deleteMyRealEstateOffice(user.sub);
  }
}
