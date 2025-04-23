// // providers/update-real-estate-office.provider.ts
// import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
// import { RealEstateOffice } from '../real-estate-office.entity';
// import { UpdateRealEstateOfficeDto } from '../dtos/update-real-estate-office.dto';
// import { DataSource } from 'typeorm';
// import { UploadsService } from '../../uploads/providers/uploads.service';
// import { Upload } from 'src/uploads/upload.entity';

// @Injectable()
// export class UpdateRealEstateOfficeProvider {
//     constructor(
//         private readonly dataSource: DataSource,
//         private readonly uploadsService: UploadsService,
//     ) { }

//     async updateRealEstateOffice(
//         id: string,
//         dto: UpdateRealEstateOfficeDto,
//         file?: Express.Multer.File
//     ): Promise<RealEstateOffice> {
//         try {
//             return await this.dataSource.transaction(async (manager) => {
//                 let previousImage;
//                 const office = await manager.findOne(RealEstateOffice, {
//                     where: { id },
//                     relations: ['photo'],
//                 });

//                 if (!office) throw new NotFoundException('Office not found');

//                 // Update fields conditionally
//                 if (dto.name) office.name = dto.name;
//                 if (dto.description) office.descrption = dto.description;

//                 if (file) {
//                     previousImage = office.photo;
//                     if (office.photo) {
//                         await this.uploadsService.deleteImageFromCloudinary('real_estate_offices', office.photo.path);
//                         // await manager.remove(Upload, office.photo);
//                     }

//                     const result = await this.uploadsService.uploadImageToCloudinary('real_estate_offices', file);
//                     const newUpload = manager.create(Upload, {
//                         path: result.secure_url,
//                         size: file.size,
//                         type: 'IMAGE',
//                     });
//                     const savedUpload = await manager.save(Upload,newUpload);
//                     office.photo = savedUpload;
//                 }

//                 await manager.save(RealEstateOffice,office);
//                 if (previousImage) {
//                     await manager.remove(Upload, previousImage);
//                 }
//                 return office;
//             });
//         } catch (error) {
//             throw new InternalServerErrorException('Failed to update RealEstateOffice', error.message);
//         }
//     }
// }





import {
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Office } from '../office.entity';
import { UpdateOfficeDto } from '../dtos/update-office.dto';
import { User } from 'src/user/user.entity';
import { PhotoService } from 'src/photo/providers/photo.service';

@Injectable()
export class UpdateOfficeProvider {
  constructor(
    private readonly dataSource: DataSource,

    @InjectRepository(Office)
    private readonly officeRepository: Repository<Office>,


    // @InjectRepository(User)
    // private readonly userRepository: Repository<User>,

    private readonly photoService: PhotoService,
  ) { }

  async updateOffice(
    ManagerId: string,
    dto: UpdateOfficeDto,
    // file?: Express.Multer.File,
  ): Promise<Office> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {

      const user = await queryRunner.manager.findOne(User, {
        where: { id: ManagerId },
        relations: ['office']
      });


      if(!user.office){
        throw new ForbiddenException('it isn\'t allowed for you to do this.')
      }

      const office = await queryRunner.manager.findOne(Office, {
        where: { id:user.office.id },
        // relations: ['license'],
      });

      // if (!office) {
      //   throw new NotFoundException(`RealEstateOffice with ID ${id} not found.`);
      // }

      // ✅ 1. Handle file update if provided
      // if (file) {
      //   const oldPhoto = office.;

      //   // 1.1 Delete old photo from cloud
      //   if (oldPhoto) {
      //     await this.photoService.deleteImageFromCloudinary('real_estate_offices', oldPhoto.path);
      //     await queryRunner.manager.remove(Upload, oldPhoto);
      //   }

      //   // 1.2 Upload new photo
      //   const uploaded = await this.photoService.uploadImageToCloudinary('real_estate_offices', file);

      //   const newUpload = queryRunner.manager.create(Upload, {
      //     path: uploaded.secure_url,
      //     size: file.size,
      //     type: fileTypes.IMAGE,
      //   });

      //   const savedUpload = await queryRunner.manager.save(newUpload);
      //   office.photo = savedUpload;
      // }

      // ✅ 2. Update other fields
      this.officeRepository.merge(office, dto);

      const updatedOffice = await queryRunner.manager.save(office);
      await queryRunner.commitTransaction();
      return updatedOffice;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      console.error('Error updating real estate office:', error);
      throw new InternalServerErrorException('Failed to update real estate office.');
    } finally {
      await queryRunner.release();
    }
  }
}
