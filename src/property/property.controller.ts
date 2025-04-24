import { Controller, Post, Body, UseInterceptors, UploadedFiles, Delete, Param, UsePipes, BadRequestException, Patch, UseGuards, Get, ParseUUIDPipe, Query } from '@nestjs/common';
import { PropertyService } from './providers/property.service';
import { FilesInterceptor } from '@nestjs/platform-express';
import { CreatePropertyDto } from './dtos/create-property.dto';
import { UpdatePropertyDto } from './dtos/update-property.dto';
import { ParseLocationPipe } from 'src/common/pipes/parse-location.pipe';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { ActiveUserData } from 'src/auth/interfaces/active-user-data.interface';
import { ActiveUser } from 'src/auth/decorators/active-user.decorator';
import { AccessRealEstateOfficeMethodsGuard } from 'src/auth/guards/access-real-estate-office-methods/access-real-estate-office-methods.guard';
import { FilterPropertyDto } from './dtos/filter-property.dto';

@Controller('property')
export class PropertyController {
  constructor(
    private readonly propertyService: PropertyService,
  ) { }





  /**
   * GET /property — filter and paginate properties
   */
  @Get()
  async getProperties(@Query() filterDto: FilterPropertyDto) {
    return this.propertyService.getPropertiesWithFilterAndPagination(filterDto);
  }


  /**
 * GET /property/:id — get a property by its ID
 */
  @Get(':id')
  async getPropertyById(@Param('id', ParseUUIDPipe) id: string) {
    return await this.propertyService.getPropertyById(id);
  }






  /**
   * Create a new property along with its files and location
   * @param createPropertyDto The data transfer object containing property details
   * @param files The uploaded files for the property (e.g., images)
   * @returns The created property entity
   */
  @Post()
  @UseInterceptors(FilesInterceptor('files'))
  @UseGuards(AccessRealEstateOfficeMethodsGuard)
  async createProperty(
    @ActiveUser() user: ActiveUserData,
    @Body(ParseLocationPipe) createPropertyDto: any,
    @UploadedFiles() files: Express.Multer.File[]
  ) {    
    return this.propertyService.createProperty(user.sub, createPropertyDto, files);
  }

  /**
   * Update an existing property
   * @param id The id of the property to be updated
   * @param updatePropertyDto The DTO containing updated property data
   * @param files The new files for the property (e.g., images)
   * @returns The updated property entity
   */
  @Patch(':id')
  @UseInterceptors(FilesInterceptor('files'))
  @UseGuards(AccessRealEstateOfficeMethodsGuard)
  async updateProperty(
    @ActiveUser() user: ActiveUserData,
    @Param('id') id: string,
    @Body(ParseLocationPipe) updatePropertyDto: any,
    @UploadedFiles() files: Express.Multer.File[] 
  ) {
    return this.propertyService.updateProperty(user.sub, id, updatePropertyDto, files);
  }

  /**
   * Delete a property along with its images and location
   * @param id The id of the property to be deleted
   * @returns A message indicating successful deletion
   */
  @Delete(':id')
  @UseGuards(AccessRealEstateOfficeMethodsGuard)
  async deleteProperty(
    @ActiveUser() user: ActiveUserData,
    @Param('id') id: string) {
    await this.propertyService.deleteProperty(user.sub, id);
    return { message: 'Property successfully deleted' };
  }
}
