// // import {
// //     Injectable,
// //     InternalServerErrorException,
// //   } from '@nestjs/common';
// //   import { InjectRepository } from '@nestjs/typeorm';
// //   import { DataSource, Repository } from 'typeorm';
// //   import { Location } from '../../locations/location.entity';
// //   import { Property } from '../property.entity';
// //   import { CreatePropertyDto } from '../dtos/create-property.dto';
// //   import { CreateLocationDto } from '../../locations/dtos/create-location.dto';
// //   import { UploadsService } from '../../uploads/providers/uploads.service';
// //   import { Upload } from 'src/uploads/upload.entity';
// //   import { fileTypes } from 'src/uploads/enums/file-type.enum';
  
// //   @Injectable()
// //   export class CreatePropertyProvider {
// //     constructor(
// //       private readonly dataSource: DataSource,
  
// //       @InjectRepository(Location)
// //       private readonly locationRepository: Repository<Location>,
  
// //       @InjectRepository(Property)
// //       private readonly propertyRepository: Repository<Property>,
  
// //       private readonly uploadsService: UploadsService,
// //     ) {}
  
// //     public async createProperty(
// //       createPropertyDto: CreatePropertyDto,
// //       files?: Express.Multer.File[],
// //     ): Promise<Property> {
// //       const queryRunner = this.dataSource.createQueryRunner();
// //       await queryRunner.connect();
// //       await queryRunner.startTransaction();
  
// //       try {
// //         const { location: locationDto, ...propertyData } = createPropertyDto;
  
// //         // 1. Save location
// //         const location = this.locationRepository.create(locationDto as CreateLocationDto);
// //         await queryRunner.manager.save(location);
  
// //         // 2. Upload and save file metadata
// //         let uploadEntities: Upload[] = [];
  
// //         if (files && files.length > 0) {
// //           for (const file of files) {
// //             const uploaded = await this.uploadsService.uploadImageToCloudinary('properties', file);
  
// //             const uploadEntity =  this.dataSource.manager.create(Upload,{
// //               path: uploaded.secure_url,
// //               size: file.size,
// //               type: fileTypes.IMAGE,
// //             });
  
// //             const savedUpload = await this.uploadsService.saveUpload(uploadEntity, queryRunner.manager);
// //             uploadEntities.push(savedUpload);
// //           }
// //         }
  
// //         // 3. Save property
// //         const property = this.propertyRepository.create({
// //           ...propertyData,
// //           location,
// //           photos: uploadEntities,
// //         });
  
// //         const savedProperty = await queryRunner.manager.save(property);
  
// //         await queryRunner.commitTransaction();
// //         return savedProperty;
// //       } catch (error) {
// //         await queryRunner.rollbackTransaction();
// //         console.error('Error creating property:', error);
// //         throw new InternalServerErrorException('Failed to create property.');
// //       } finally {
// //         await queryRunner.release();
// //       }
// //     }
// //   }
  




// import {
//     Injectable,
//     InternalServerErrorException,
//   } from '@nestjs/common';
//   import { InjectRepository } from '@nestjs/typeorm';
//   import { DataSource, Repository } from 'typeorm';
//   import { Location } from '../../locations/location.entity';
//   import { Property } from '../property.entity';
//   import { CreatePropertyDto } from '../dtos/create-property.dto';
//   import { CreateLocationDto } from '../../locations/dtos/create-location.dto';
//   import { UploadsService } from '../../uploads/providers/uploads.service';
//   import { Upload } from '../../uploads/upload.entity';
//   import { fileTypes } from '../../uploads/enums/file-type.enum';
  
//   @Injectable()
//   export class CreatePropertyProvider {
//     constructor(
//       private readonly dataSource: DataSource,
  
//       @InjectRepository(Location)
//       private readonly locationRepository: Repository<Location>,
  
//       @InjectRepository(Property)
//       private readonly propertyRepository: Repository<Property>,
  
//       private readonly uploadsService: UploadsService,
//     ) {}
  
//     public async createProperty(
//       createPropertyDto: CreatePropertyDto,
//       files?: Express.Multer.File[],
//     ): Promise<Property> {
//       const queryRunner = this.dataSource.createQueryRunner();
//       await queryRunner.connect();
//       await queryRunner.startTransaction();
  
//       try {
//         const { location: locationDto, ...propertyData } = createPropertyDto;
  
//         // 1. Save location
//         const location = this.locationRepository.create(locationDto as CreateLocationDto);
//         await queryRunner.manager.save(location);
  
//         // 2. Upload and save file metadata
//         const uploadEntities: Upload[] = [];
  
//         if (files && files.length > 0) {
//           for (const file of files) {
//             const uploaded = await this.uploadsService.uploadImageToCloudinary('properties', file);
  
//             const uploadEntity = queryRunner.manager.create(Upload, {
//               path: uploaded.secure_url,
//               size: file.size,
//               type: fileTypes.IMAGE,
//             });
  
//             const savedUpload = await this.uploadsService.saveUpload(uploadEntity, queryRunner.manager);
//             uploadEntities.push(savedUpload);
//           }
//         }
  
//         // 3. Save property
//         const property = this.propertyRepository.create({
//           ...propertyData,
//           location,
//           photos: uploadEntities,
//         });
  
//         const savedProperty = await queryRunner.manager.save(property);
  
//         await queryRunner.commitTransaction();
//         return savedProperty;
//       } catch (error) {
//         await queryRunner.rollbackTransaction();
//         console.error('Error creating property:', error);
//         throw new InternalServerErrorException('Failed to create property.');
//       } finally {
//         await queryRunner.release();
//       }
//     }
//   }
  


import {
    Injectable,
    InternalServerErrorException,
  } from '@nestjs/common';
  import { DataSource } from 'typeorm';
  import { Property } from '../property.entity';
  import { CreatePropertyDto } from '../dtos/create-property.dto';
  import { CreateLocationDto } from '../../locations/dtos/create-location.dto';
  import { UploadsService } from '../../uploads/providers/uploads.service';
  import { Upload } from '../../uploads/upload.entity';
  import { fileTypes } from '../../uploads/enums/file-type.enum';
  import { Location } from '../../locations/location.entity';
  
  @Injectable()
  export class CreatePropertyProvider {
    constructor(
      private readonly dataSource: DataSource,
      private readonly uploadsService: UploadsService,
    ) {}
  
    public async createProperty(
      createPropertyDto: CreatePropertyDto,
      files?: Express.Multer.File[],
    ): Promise<Property> {
      const queryRunner = this.dataSource.createQueryRunner();
      await queryRunner.connect();
      await queryRunner.startTransaction();
  
      try {
        const { location: locationDto, ...propertyData } = createPropertyDto;
  
        // 1. Save location using queryRunner.manager
        const location = queryRunner.manager.create(Location, locationDto as CreateLocationDto);
        await queryRunner.manager.save(location);
  
        // 2. Upload and save file metadata
        const uploadEntities: Upload[] = [];
  
        if (files && files.length > 0) {
          for (const file of files) {
            const uploaded = await this.uploadsService.uploadImageToCloudinary('properties', file);
  
            const uploadEntity = queryRunner.manager.create(Upload, {
              path: uploaded.secure_url,
              size: file.size,
              type: fileTypes.IMAGE,
            });
  
            const savedUpload = await this.uploadsService.saveUpload(uploadEntity, queryRunner.manager);
            uploadEntities.push(savedUpload);
          }
        }
  
        // 3. Save property using queryRunner.manager
        const property = queryRunner.manager.create(Property, {
          ...propertyData,
          location,
          photos: uploadEntities,
        });
  
        const savedProperty = await queryRunner.manager.save(property);
  
        await queryRunner.commitTransaction();
        return savedProperty;
      } catch (error) {
        await queryRunner.rollbackTransaction();
        console.error('Error creating property:', error);
        throw new InternalServerErrorException('Failed to create property.');
      } finally {
        await queryRunner.release();
      }
    }
  }
  