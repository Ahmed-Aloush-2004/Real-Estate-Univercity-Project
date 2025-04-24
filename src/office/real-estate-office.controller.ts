
// real-estate-office.controller.ts
import { Controller, Post, UseInterceptors, UploadedFile, Body, Req, Put, Param, Delete, Patch, Get, UseGuards, ParseUUIDPipe } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { OfficeService } from './office.service';
import { UpdateOfficeDto } from './dtos/update-office.dto';
import { AccessRealEstateOfficeMethodsGuard } from '../auth/guards/access-real-estate-office-methods/access-real-estate-office-methods.guard';
import { ActiveUser } from 'src/auth/decorators/active-user.decorator';
import { ActiveUserData } from 'src/auth/interfaces/active-user-data.interface';
import { CreateOfficeDto } from './dtos/create-office.dto';

@Controller('offices')
export class RealEstateOfficeController {
  constructor(private readonly service: OfficeService) { }


  @Get(':id')
  async get(
    @Param('id', ParseUUIDPipe) id: string,
    @ActiveUser() user: ActiveUserData,

  ) {
    return this.service.getOfficeById(id);
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
    @Body() dto: CreateOfficeDto,
    @UploadedFile() file: Express.Multer.File,
    @ActiveUser() user: ActiveUserData,
  ) {

    return this.service.createOffice(dto, file, user.sub);
  }

  @Patch()
  @UseGuards(AccessRealEstateOfficeMethodsGuard)
  async update(
    @ActiveUser() user: ActiveUserData,
    @Body() updateRealEstateOfficeDto: UpdateOfficeDto,

  ) {

    return this.service.updateMyOffice(user.sub, updateRealEstateOfficeDto);
  }


  @Delete('')
  @UseGuards(AccessRealEstateOfficeMethodsGuard)
  async delete(
    @ActiveUser() user: ActiveUserData,
  ) {
    console.log("user",user.sub);
    
    return this.service.deleteMyOffice(user.sub);
  }
}
