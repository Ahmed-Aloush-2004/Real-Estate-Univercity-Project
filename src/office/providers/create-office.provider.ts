// providers/create-real-estate-office.provider.ts
import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { UserService } from '../../user/providers/users.service';
import { Office } from '../office.entity';
import { DataSource } from 'typeorm';
import { PhotoService } from 'src/photo/providers/photo.service';
import { CreateOfficeDto } from '../dtos/create-office.dto';
import { Photo } from 'src/photo/photo.entity';

@Injectable()
export class CreateOfficeProvider {
  constructor(
    private readonly photoService: PhotoService,
    private readonly userService: UserService,
    private readonly dataSource: DataSource,
  ) { }

  async createOffice(
    dto: CreateOfficeDto,
    license: Express.Multer.File,
    managerId: string
  ): Promise<Office> {
    try {
      return await this.dataSource.transaction(async (manager) => {


        const user = await this.userService.findOneUserById(managerId);
        if (!user) throw new NotFoundException('Manager not found');

        const result = await this.photoService.uploadImageToCloudinary('licenses', license);

        const photo = manager.create(Photo, {
          url: result.secure_url
        });
        const savedPhoto = await manager.save(photo);

        const office = manager.create(Office, {
          name: dto.name,
          license: savedPhoto,
          manager: user,
        });

        return await manager.save(office);
      });
    } catch (error) {
      throw new InternalServerErrorException('Failed to create RealEstateOffice', error.message);
    }
  }
}