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
} from '@nestjs/common';
import { DataSource } from 'typeorm';
import { Office } from '../office.entity';
import { User } from 'src/user/user.entity';
import { PhotoService } from 'src/photo/providers/photo.service';

@Injectable()
export class DeleteOfficeProvider {
  constructor(
    private readonly dataSource: DataSource,

    private readonly photoService: PhotoService,
  ) {}

  public async deleteOffice(ManagerId: string): Promise<void> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const user = await queryRunner.manager.findOne(User, {
        where: { id: ManagerId },
        relations: ['realEstateOffice']
      });


      if(!user.office){
        throw new ForbiddenException('it isn\'t allowed for you to do this.')
      }

      const office = await queryRunner.manager.findOne(Office, {
        where: { id:user.office.id },
        relations: ['photo'],
      });


      // ✅ 1. Delete photo from Cloudinary
      // if (office.photo) {
      //   await this.photoService.deleteImageFromCloudinary('real_estate_offices', office.photo.path);

      //   // ✅ 2. Remove Upload entity
      //   await queryRunner.manager.delete(Upload, { id: office.photo.id });
      // }



      // ✅ 3. Delete the RealEstateOffice
      await queryRunner.manager.remove(Office, office);

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
