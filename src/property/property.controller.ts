import { Controller, Post, Body, UseInterceptors, UploadedFiles, Delete, Param, UsePipes, BadRequestException, Patch } from '@nestjs/common';
import { PropertyService } from './providers/property.service';
import { FilesInterceptor } from '@nestjs/platform-express';
import { CreatePropertyDto } from './dtos/create-property.dto';
import { UpdatePropertyDto } from './dtos/update-property.dto';
import { ParseLocationPipe } from 'src/common/pipes/parse-location.pipe';

@Controller('property')
export class PropertyController {
  constructor(
    private readonly propertyService: PropertyService,
  ) {}

  /**
   * Create a new property along with its files and location
   * @param createPropertyDto The data transfer object containing property details
   * @param files The uploaded files for the property (e.g., images)
   * @returns The created property entity
   */
  @Post()
  @UseInterceptors(FilesInterceptor('files'))
  async createProperty(
    @Body(ParseLocationPipe) createPropertyDto: any, 
    @UploadedFiles() files: Express.Multer.File[]
  ) {
    console.log("yes");
    
    // if (typeof createPropertyDto.location === 'string') {
    //     try {
    //       createPropertyDto.location = JSON.parse(createPropertyDto.location);
    //     } catch (err) {
    //       throw new BadRequestException('Invalid JSON for location');
    //     }
    //   }
    return this.propertyService.createProperty(createPropertyDto, files);
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
  async updateProperty(
    @Param('id') id: string,
    @Body(ParseLocationPipe) updatePropertyDto: any,
    @UploadedFiles() files: Express.Multer.File[]
  ) {
    return this.propertyService.updateProperty(id, updatePropertyDto, files);
  }

  /**
   * Delete a property along with its images and location
   * @param id The id of the property to be deleted
   * @returns A message indicating successful deletion
   */
  @Delete(':id')
  async deleteProperty(@Param('id') id: string) {
    await this.propertyService.deleteProperty(id);
    return { message: 'Property successfully deleted' };
  }
}
 