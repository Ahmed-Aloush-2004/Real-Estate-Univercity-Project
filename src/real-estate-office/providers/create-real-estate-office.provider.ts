// providers/create-real-estate-office.provider.ts
import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { CreateRealEstateOfficeDto } from '../dtos/create-real-estate-office.dto';
import { UploadsService } from '../../uploads/providers/uploads.service';
import { UsersService } from '../../users/providers/users.service';
import { RealEstateOffice } from '../real-estate-office.entity';
import { Upload } from 'src/uploads/upload.entity';
import { DataSource } from 'typeorm';

@Injectable()
export class CreateRealEstateOfficeProvider {
  constructor(
    private readonly uploadsService: UploadsService,
    private readonly usersService: UsersService,
    private readonly dataSource: DataSource,
  ) {}

  async createRealEstateOffice(dto: CreateRealEstateOfficeDto, file: Express.Multer.File, managerId: string): Promise<RealEstateOffice> {
    try {
      return await this.dataSource.transaction(async (manager) => {

        
        const user = await this.usersService.findOneUserById(managerId);
        if (!user) throw new NotFoundException('Manager not found');

        const result = await this.uploadsService.uploadImageToCloudinary('real_estate_offices', file);

        const upload = manager.create(Upload, {
          path: result.secure_url,
          size: file.size,
          type: 'IMAGE',
        });
        const savedUpload = await manager.save(upload);

        const office = manager.create(RealEstateOffice, {
          name: dto.name,
          descrption: dto.description,
          photo: savedUpload,
          manager: user,
        });

        return await manager.save(office);
      });
    } catch (error) {
      throw new InternalServerErrorException('Failed to create RealEstateOffice', error.message);
    }
  }
}