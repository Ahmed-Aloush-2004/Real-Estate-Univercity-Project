// import {
//   ForbiddenException,
//   Injectable,
//   InternalServerErrorException,
//   NotFoundException,
// } from '@nestjs/common';
// import { DataSource } from 'typeorm';
// import { Office } from '../office.entity';
// import { User } from 'src/user/user.entity';
// import { PhotoService } from 'src/photo/providers/photo.service';
// import { Photo } from 'src/photo/photo.entity';

// @Injectable()
// export class DeleteOfficeProvider {
//   constructor(
//     private readonly dataSource: DataSource,

//     private readonly photoService: PhotoService,
//   ) { }

//   public async deleteOffice(ManagerId: string): Promise<void> {
//     console.log("inside the provider", ManagerId);

//     const queryRunner = this.dataSource.createQueryRunner();
//     await queryRunner.connect();
//     await queryRunner.startTransaction();

//     try {
//       // const user = await queryRunner.manager.findOne(User, {
//       //   where: { id: ManagerId },
//       //   relations: ['office']
//       // });


//       // if (!user.office) {
//       //   throw new ForbiddenException('it isn\'t allowed for you to do this.')
//       // }

//       const office = await queryRunner.manager.findOne(Office, {
//         // where: { id: user.office.id },
//         where: { 
//           manager:{
//             id:ManagerId
//           }
//          },
//         relations: ['license'],
//       });

//       console.log(office);


//       if(!office){
//         throw new NotFoundException(`You don't have any office to delete.`)
//       }



//       // ✅ 1. Delete license from Cloudinary
//       await this.photoService.deleteImageFromCloudinary(office.license.publicId);


//       // ✅ 3. Delete the RealEstateOffice
//       await queryRunner.manager.delete(Office,office.id);

//       // ✅ 2. Remove Upload entity
//       await queryRunner.manager.delete(Photo, office.license.id);



//       await queryRunner.commitTransaction();
//     } catch (error) {
//       await queryRunner.rollbackTransaction();
//       console.error('Error deleting real estate office:', error);
//       throw new InternalServerErrorException('Failed to delete office.');
//     } finally {
//       await queryRunner.release();
//     }
//   }
// }





import {
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { DataSource } from 'typeorm';
import { Office } from '../entities/office.entity';
import { PhotoService } from 'src/photo/providers/photo.service';
import { Photo } from 'src/photo/photo.entity';
import { Property } from 'src/property/entities/property.entity';
import { PropertyService } from 'src/property/providers/property.service';

@Injectable()
export class DeleteOfficeProvider {
  constructor(
    private readonly dataSource: DataSource,
    private readonly photoService: PhotoService,

    private readonly propertyService: PropertyService,
  ) { }

  public async deleteOffice(managerId: string): Promise<void> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const office = await queryRunner.manager.findOne(Office, {
        where: { manager: { id: managerId } },
        relations: ['license', 'properties'],
      });

      if (!office) {
        throw new NotFoundException(`You don't have any office to delete.`);
      }



      // ✅ Step 2: Remove or delete properties linked to this office
      if (office.properties?.length) {
        console.log("office.properties",office.properties);
        for (const property of office.properties) {
          // await queryRunner.manager.delete(Property, property.id);
          await this.propertyService.deleteProperty(managerId, property.id);
        }
      }

      // ✅ Step 3: Delete the Office itself
      await queryRunner.manager.delete(Office, office.id);





      // ✅ Step 1: Delete license from Cloudinary
      if (office.license) {
        await this.photoService.deleteImageFromCloudinary(office.license.publicId);
        await queryRunner.manager.delete(Photo, office.license.id);
      }






      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      console.error('Error deleting office:', error);
      throw new InternalServerErrorException('Failed to delete office.');
    } finally {
      await queryRunner.release();
    }
  }
}
