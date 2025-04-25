import {
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Property } from '../property.entity';
import { Location } from '../../location/location.entity';
import { Office } from 'src/office/office.entity';
import { PhotoService } from 'src/photo/providers/photo.service';
import { Photo } from 'src/photo/photo.entity';

@Injectable()
export class DeletePropertyProvider {
  constructor(
    private readonly dataSource: DataSource,

    @InjectRepository(Property)
    private readonly propertyRepository: Repository<Property>,

    @InjectRepository(Location)
    private readonly locationRepository: Repository<Location>,

    private readonly photoService: PhotoService,
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
             relations: ['location', 'photos', 'office'],
           });
     
           if (!property) {
             throw new NotFoundException(`Property with ID ${id} not found.`);
           }
     
           let office = await queryRunner.manager.findOne(Office,{
             where:{
               id:property.office.id
             },
             relations:['manager']
           })
     
     
           if (office.manager.id !== officeManagerId) {
             throw new ForbiddenException('You don\'t allow for you to do it!.')
           }


      // ✅ 1. Delete photos from Cloudinary
      if (property.photos && property.photos.length > 0) { 
        for (const photo of property.photos) {
          await this.photoService.deleteImageFromCloudinary(photo.publicId);
        }

        // ✅ 2. Remove Upload entities
        for (const photo of property.photos) { 
          await queryRunner.manager.delete(Photo, { id: photo.id });
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
