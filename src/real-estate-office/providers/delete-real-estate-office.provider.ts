// // providers/delete-real-estate-office.provider.ts
// import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
// import { RealEstateOffice } from '../real-estate-office.entity';
// import { DataSource } from 'typeorm';
// import { UploadsService } from 'src/uploads/providers/uploads.service';

// @Injectable()
// export class DeleteRealEstateOfficeProvider {
//   constructor(
//     private readonly dataSource: DataSource,
//     private readonly uploadsService:UploadsService,

//   ) {}

//   async deleteRealEstateOffice(id: string): Promise<void> {
//     try {
//       await this.dataSource.transaction(async (manager) => {
//         const office = await manager.findOne(RealEstateOffice, { where: { id },relations:['photo'] });
//         if (!office) throw new NotFoundException('Office not found');

//         await this.uploadsService.deleteImageFromCloudinary('real_estate_offices', office.photo.path);


//         await manager.remove(office);
//       }); 
//     } catch (error) {
//         console.log(error);
        
//       throw new InternalServerErrorException('Failed to delete RealEstateOffice', error.message);
//     }
//   }
// }



import {
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { RealEstateOffice } from '../real-estate-office.entity';
import { Upload } from '../../uploads/upload.entity';
import { UploadsService } from '../../uploads/providers/uploads.service';
import { User } from 'src/users/user.entity';

@Injectable()
export class DeleteRealEstateOfficeProvider {
  constructor(
    private readonly dataSource: DataSource,

    private readonly uploadsService: UploadsService,
  ) {}

  public async deleteRealEstateOffice(ManagerId: string): Promise<void> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const user = await queryRunner.manager.findOne(User, {
        where: { id: ManagerId },
        relations: ['realEstateOffice']
      });


      if(!user.realEstateOffice){
        throw new ForbiddenException('it isn\'t allowed for you to do this.')
      }

      const office = await queryRunner.manager.findOne(RealEstateOffice, {
        where: { id:user.realEstateOffice.id },
        relations: ['photo'],
      });


      // ✅ 1. Delete photo from Cloudinary
      if (office.photo) {
        await this.uploadsService.deleteImageFromCloudinary('real_estate_offices', office.photo.path);

        // ✅ 2. Remove Upload entity
        await queryRunner.manager.delete(Upload, { id: office.photo.id });
      }

      // ✅ 3. Delete the RealEstateOffice
      await queryRunner.manager.remove(RealEstateOffice, office);

      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      console.error('Error deleting real estate office:', error);
      throw new InternalServerErrorException('Failed to delete real estate office.');
    } finally {
      await queryRunner.release();
    }
  }
}
