import {
  forwardRef,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException
} from '@nestjs/common';
import { DataSource } from 'typeorm';
import { Property } from '../entities/property.entity';
import { CreatePropertyDto } from '../dtos/create-property.dto';
import { Location } from '../../location/location.entity';
import { User } from 'src/user/entities/user.entity';
import { PhotoService } from 'src/photo/providers/photo.service';
import { PropertyProblem } from 'src/property-problem/property-problem.entity';
import { PropertyProblemService } from 'src/property-problem/property-problem.service';
import { PropertyPhoto } from '../entities/property-photo.entity';
import { CreateAttributeDto } from 'src/attribute/dto/create-attribute.dto';
import { PropertyTypeService } from 'src/propertyType/propertyType.service';

@Injectable()
export class CreatePropertyProvider {
  constructor(
    private readonly dataSource: DataSource,
    private readonly photoService: PhotoService,
    @Inject(forwardRef(()=> PropertyProblemService))
    private readonly propertyProblemService:PropertyProblemService,
    private readonly propertyTypeService:PropertyTypeService,
  ) { }

  public async createProperty(
    officeManagerId: string,
    createPropertyDto: CreatePropertyDto,
    files?: Express.Multer.File[],
  ): Promise<Property> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const { location: locationDto, ...propertyData } = createPropertyDto;
  
      const propertyType = await this.propertyTypeService.getPropertyTypeWithNoAttributes(propertyData.type);
      console.log(propertyType);
      const user = await queryRunner.manager.findOne(User, {
        where: { id: officeManagerId },
        relations: ['office'],
      });
  
      if (!user) {
        throw new NotFoundException('Manager not found.');
      }
  
      if (!user.office) {
        throw new NotFoundException('User has no office assigned.');
      }
  
      const location = queryRunner.manager.create(Location, locationDto);
      await queryRunner.manager.save(location);
      
      const property = queryRunner.manager.create(Property, {
        ...propertyData,
        propertyType: propertyType,
        location:location,
        office: user.office,
      });
      
      const propertyPhotos: PropertyPhoto[] = [];
      if (files?.length) {
        for (const file of files) {
          const uploadedPropertyPhoto = await this.photoService.uploadImageToCloudinary('properties', file);
          const propertyPhoto = queryRunner.manager.create(PropertyPhoto, { url: uploadedPropertyPhoto.secure_url, publicId:uploadedPropertyPhoto.public_id,property:property });
          const savedUpload = await this.photoService.saveUpload(propertyPhoto, queryRunner.manager);
          propertyPhotos.push(propertyPhoto);
        }
      }

      const problems: PropertyProblem[] = [];
      if (createPropertyDto.problems?.length) {
        for (const problem of createPropertyDto.problems) {
          const createdProblem = await this.propertyProblemService.addPropertyProblem({propertyId:property.id,name:problem});
          problems.push(createdProblem);
        }
      }
      property.PropertyProblems = problems;
      property.propertyPhotos = propertyPhotos;
      const savedProperty = await queryRunner.manager.save(property);
  
      await queryRunner.commitTransaction();
      return savedProperty;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      console.error('Error creating property:', error);
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException('Failed to create property.');
    } finally {
      await queryRunner.release();
    }
  }
  






}









































  
//   public async createProperty(
//     officeManagerId: string,
//     createPropertyDto: CreatePropertyDto,
//     files?: Express.Multer.File[],
//   ): Promise<Property> {
//     const queryRunner = this.dataSource.createQueryRunner();
//     await queryRunner.connect();
//     await queryRunner.startTransaction();
    
//     try {
//       const { location: locationDto, ...propertyData } = createPropertyDto;

//       const user = await queryRunner.manager.findOne(User, {
//         where: {
//           id: officeManagerId
//         },
//         relations:['office']
//       });
      
          
//           const office = await queryRunner.manager.findOne(Office, {
//             where: { 
//               id:user.office.id
//             },
//             relations: ['manager'],
//           });
          
          
//           if (!office) {
//             throw new NotFoundException('You don\'t any Office to add any Property to it!.')
//           }
          
//           // 1. Save location using queryRunner.manager
//           const location = queryRunner.manager.create(Location, locationDto as CreateLocationDto);
//           await queryRunner.manager.save(location);
          
//           // 2. Upload and save file metadata
//           const photos: Photo[] = [];
          
//           if (files && files.length > 0) {
//             for (const file of files) {
//               const uploaded = await this.photoService.uploadImageToCloudinary('properties', file);
              
//               const photo = queryRunner.manager.create(Photo, {
//                 url: uploaded.secure_url,
//               });
              
//               const savedUpload = await this.photoService.saveUpload(photo, queryRunner.manager);
//               photos.push(savedUpload);
//             }
//           }
          
//           // 3. Save property using queryRunner.manager
//           // const property = queryRunner.manager.create(Property, {
//           //   ...propertyData,
//           //   location,
//           //   photos: photos,
//           //   office: office,
//           // });



//       user.office.properties.push({
//             ...propertyData,
//             location,
//             photos: photos
//       } )

          
//           const savedProperty = await queryRunner.manager.save(property);
          
//           await queryRunner.commitTransaction();
//           return savedProperty;
//         } catch (error) {
//           await queryRunner.rollbackTransaction();
//           console.error('Error creating property:', error);
//           if (error instanceof NotFoundException) throw error;
//           throw new InternalServerErrorException('Failed to create property.');
//         } finally {
//           await queryRunner.release();
//         }
//       }
//     }
























    
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
    
    
