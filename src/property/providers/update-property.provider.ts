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
import { UpdatePropertyDto } from '../dtos/update-property.dto';
import { fileTypes } from '../../uploads/enums/file-type.enum';
import { UpdateLocationDto } from 'src/real-estate-office/locations/dtos/update-location.dto';
import { RealEstateOffice } from 'src/real-estate-office/real-estate-office.entity';

@Injectable()
export class UpdatePropertyProvider {
  constructor(
    private readonly dataSource: DataSource,

    @InjectRepository(Property)
    private readonly propertyRepository: Repository<Property>,

    @InjectRepository(Location)
    private readonly locationRepository: Repository<Location>,

    private readonly uploadsService: UploadsService,
  ) { }

  public async updateProperty(
    officeManagerId: string,
    id: string,
    updateDto: UpdatePropertyDto,
    files?: Express.Multer.File[],
  ): Promise<Property> {
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

      const { location: locationDto, ...propertyUpdates } = updateDto;

      // ✅ 1. Update location if provided
      if (locationDto) {
        if (property.location) {
          queryRunner.manager.merge(Location, property.location, locationDto as UpdateLocationDto);
          await queryRunner.manager.save(property.location);
        } else {
          const newLocation = this.locationRepository.create(locationDto);
          await queryRunner.manager.save(newLocation);
          property.location = newLocation;
        }
      }

      // ✅ 2. If new files provided → delete old images & add new
      if (files && files.length > 0) {
        const oldUploads = property.photos || [];

        // 2.1 Delete old Cloudinary files
        for (const file of oldUploads) {
          await this.uploadsService.deleteImageFromCloudinary('properties', file.path);
        }

        // 2.2 Delete Upload entities
        await queryRunner.manager.remove(Upload, oldUploads);

        // 2.3 Upload and save new files
        const newUploads: Upload[] = [];

        for (const file of files) {
          const uploaded = await this.uploadsService.uploadImageToCloudinary('properties', file);

          const uploadEntity = queryRunner.manager.create(Upload, {
            path: uploaded.secure_url,
            size: file.size,
            type: fileTypes.IMAGE,
          });

          const savedUpload = await this.uploadsService.saveUpload(uploadEntity, queryRunner.manager);
          newUploads.push(savedUpload);
        }

        property.photos = newUploads;
      }

      // ✅ 3. Update other property fields
      this.propertyRepository.merge(property, propertyUpdates);
      const updatedProperty = await queryRunner.manager.save(property);

      await queryRunner.commitTransaction();
      return updatedProperty;
    } catch (error) {
      if(error instanceof (NotFoundException || ForbiddenException)) throw error
      await queryRunner.rollbackTransaction();
      throw new InternalServerErrorException('Failed to update property.');
    } finally {
      await queryRunner.release();
    }
  }
}
