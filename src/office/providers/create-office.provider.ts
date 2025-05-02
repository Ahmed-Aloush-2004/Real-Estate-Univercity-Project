// providers/create-real-estate-office.provider.ts
import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { UserService } from '../../user/providers/users.service';
import { Office } from '../entities/office.entity';
import { DataSource, Repository } from 'typeorm';
import { PhotoService } from 'src/photo/providers/photo.service';
import { CreateOfficeDto } from '../dtos/create-office.dto';
import { LicensePhoto } from '../entities/license-photo.entity';

@Injectable()
export class CreateOfficeProvider {
  constructor(
    private readonly photoService: PhotoService,
    private readonly userService: UserService,
    private readonly dataSource: DataSource,
  ) {}

  async createOffice(
    dto: CreateOfficeDto,
    licenseFile: Express.Multer.File,
    managerId: string,
  ): Promise<Office> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      // Fetch manager user
      const managerUser = await this.userService.findOneUserById(managerId);
      if (!managerUser) {
        throw new NotFoundException(`Manager with ID ${managerId} not found`);
      }

      // Upload license photo
      const uploaded = await this.photoService.uploadImageToCloudinary('licenses', licenseFile);

      // Create photo entity
      const licensePhoto = new LicensePhoto();
      licensePhoto.url = uploaded.secure_url;
      licensePhoto.publicId = uploaded.public_id;
      const savedLicensePhoto = await queryRunner.manager.save(LicensePhoto, licensePhoto);
      
      // Create office entity
      const newOffice = new Office();
      newOffice.name = dto.name;
      newOffice.license = savedLicensePhoto;
      newOffice.manager = managerUser;
      
      console.log(savedLicensePhoto.id);

      const savedOffice = await queryRunner.manager.save(Office, newOffice);

      console.log("saved        ///    " + savedLicensePhoto.id);

      await queryRunner.commitTransaction();
      return savedOffice;
    } catch (error) {
      console.log(error);
      
      await queryRunner.rollbackTransaction();
      throw new InternalServerErrorException('Failed to create RealEstateOffice');
    } finally {
      await queryRunner.release();
    }
  }
}
