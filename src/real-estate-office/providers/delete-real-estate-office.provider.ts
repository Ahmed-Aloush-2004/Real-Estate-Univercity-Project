// providers/delete-real-estate-office.provider.ts
import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { RealEstateOffice } from '../real-estate-office.entity';
import { DataSource } from 'typeorm';
import { UploadsService } from 'src/uploads/providers/uploads.service';

@Injectable()
export class DeleteRealEstateOfficeProvider {
  constructor(
    private readonly dataSource: DataSource,
    private readonly uploadsService:UploadsService,

  ) {}

  async deleteRealEstateOffice(id: string): Promise<void> {
    try {
      await this.dataSource.transaction(async (manager) => {
        const office = await manager.findOne(RealEstateOffice, { where: { id },relations:['photo'] });
        if (!office) throw new NotFoundException('Office not found');

        await this.uploadsService.deleteImageFromCloudinary('real_estate_offices', office.photo.path);


        await manager.remove(office);
      }); 
    } catch (error) {
        console.log(error);
        
      throw new InternalServerErrorException('Failed to delete RealEstateOffice', error.message);
    }
  }
}