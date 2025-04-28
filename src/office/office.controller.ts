
// real-estate-office.controller.ts
import { Controller, Post, UseInterceptors, UploadedFile, Body, Req, Put, Param, Delete, Patch, Get, UseGuards, ParseUUIDPipe } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { OfficeService } from './office.service';
import { UpdateOfficeDto } from './dtos/update-office.dto';
import { AccessRealEstateOfficeMethodsGuard } from '../auth/guards/access-real-estate-office-methods/access-real-estate-office-methods.guard';
import { ActiveUser } from 'src/auth/decorators/active-user.decorator';
import { ActiveUserData } from 'src/auth/interfaces/active-user-data.interface';
import { CreateOfficeDto } from './dtos/create-office.dto';

@Controller('office')
export class OfficeController {
  constructor(private readonly officeService: OfficeService) { }

  @Get()
  async getAllOffices(){
    return this.officeService.getAllOffices()
  }

  @Get(':id')
  async getOfficeById(
    @Param('id', ParseUUIDPipe) id: string,
    @ActiveUser() user: ActiveUserData,
  ) {
    return this.officeService.getOfficeById(id);
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
  async createOffice(
    @Body() dto: CreateOfficeDto,
    @UploadedFile() file: Express.Multer.File,
    @ActiveUser() user: ActiveUserData,
  ) {
    return this.officeService.createOffice(dto, file, user.sub);
  }

  @Patch()
  @UseGuards(AccessRealEstateOfficeMethodsGuard)
  async updateOffice(
    @ActiveUser() user: ActiveUserData,
    @Body() updateRealEstateOfficeDto: UpdateOfficeDto,

  ) {
    return this.officeService.updateMyOffice(user.sub, updateRealEstateOfficeDto);
  }


  @Delete('')
  @UseGuards(AccessRealEstateOfficeMethodsGuard)
  async deleteOffice(
    @ActiveUser() user: ActiveUserData,
  ) {    
    return this.officeService.deleteMyOffice(user.sub);
  }
}
