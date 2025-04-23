import {
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Property } from '../property.entity';
import { Location } from '../../real-estate-office/locations/location.entity';
import { Upload } from '../../uploads/upload.entity';
import { UploadsService } from '../../uploads/providers/uploads.service';
import { RealEstateOffice } from 'src/real-estate-office/real-estate-office.entity';

@Injectable()
export class DeletePropertyProvider {
  constructor(
    private readonly dataSource: DataSource,

    @InjectRepository(Property)
    private readonly propertyRepository: Repository<Property>,

    @InjectRepository(Location)
    private readonly locationRepository: Repository<Location>,

    private readonly uploadsService: UploadsService,
  ) { }

  public async deleteProperty(
    officeManagerId: string,
    id: string
  ): Promise<void> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
        const property = await queryRunner.manager.findOne(Property, {
             where: { id },
             relations: ['location', 'photos', 'realEstateOffice'],
           });
     
           if (!property) {
             throw new NotFoundException(`Property with ID ${id} not found.`);
           }
     
           let realEstateOffice = await queryRunner.manager.findOne(RealEstateOffice,{
             where:{
               id:property.realEstateOffice.id
             },
             relations:['manager']
           })
     
     
           if (realEstateOffice.manager.id !== officeManagerId) {
             throw new ForbiddenException('You don\'t allow for you to do it!.')
           }


      // ✅ 1. Delete photos from Cloudinary
      if (property.photos && property.photos.length > 0) { 
        for (const photo of property.photos) {
          await this.uploadsService.deleteImageFromCloudinary('properties', photo.path);
        }

        // ✅ 2. Remove Upload entities
        for (const photo of property.photos) {
          await queryRunner.manager.delete(Upload, { id: photo.id });
        }
      }

      
      // ✅ 3. Delete the property
      await queryRunner.manager.remove(Property, property);
      
      // ✅ 4. Optionally delete location if it's not reused
      if (property.location) {
        await queryRunner.manager.remove(Location, property.location);
      }
      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      console.error('Error deleting property:', error);
      throw new InternalServerErrorException('Failed to delete property.');
    } finally {
      await queryRunner.release();
    }
  }
}
