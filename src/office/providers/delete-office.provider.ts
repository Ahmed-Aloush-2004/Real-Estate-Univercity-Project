import {
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { DataSource } from 'typeorm';
import { Office } from '../office.entity';
import { User } from 'src/user/user.entity';
import { PhotoService } from 'src/photo/providers/photo.service';
import { Photo } from 'src/photo/photo.entity';

@Injectable()
export class DeleteOfficeProvider {
  constructor(
    private readonly dataSource: DataSource,

    private readonly photoService: PhotoService,
  ) { }

  public async deleteOffice(ManagerId: string): Promise<void> {
    console.log("inside the provider", ManagerId);

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const user = await queryRunner.manager.findOne(User, {
        where: { id: ManagerId },
        relations: ['office']
      });


      if (!user.office) {
        throw new ForbiddenException('it isn\'t allowed for you to do this.')
      }

      const office = await queryRunner.manager.findOne(Office, {
        where: { id: user.office.id },
        relations: ['license'],
      });






      // ✅ 3. Delete the RealEstateOffice
      await queryRunner.manager.remove(Office, office);

      // ✅ 1. Delete license from Cloudinary
      await this.photoService.deleteImageFromCloudinary(office.license.publicId);

      // ✅ 2. Remove Upload entity
      await queryRunner.manager.delete(Photo, { id: office.license.id });

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
