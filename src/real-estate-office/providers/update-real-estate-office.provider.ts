// providers/update-real-estate-office.provider.ts
import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { RealEstateOffice } from '../real-estate-office.entity';
import { UpdateRealEstateOfficeDto } from '../dtos/update-real-estate-office.dto';
import { DataSource } from 'typeorm';
import { UploadsService } from '../../uploads/providers/uploads.service';
import { Upload } from 'src/uploads/upload.entity';

@Injectable()
export class UpdateRealEstateOfficeProvider {
    constructor(
        private readonly dataSource: DataSource,
        private readonly uploadsService: UploadsService,
    ) { }

    async updateRealEstateOffice(
        id: string,
        dto: UpdateRealEstateOfficeDto,
        file?: Express.Multer.File
    ): Promise<RealEstateOffice> {
        try {
            return await this.dataSource.transaction(async (manager) => {
                let previousImage;
                const office = await manager.findOne(RealEstateOffice, {
                    where: { id },
                    relations: ['photo'],
                });

                if (!office) throw new NotFoundException('Office not found');

                // Update fields conditionally
                if (dto.name) office.name = dto.name;
                if (dto.description) office.descrption = dto.description;

                if (file) {
                    previousImage = office.photo;
                    if (office.photo) {
                        await this.uploadsService.deleteImageFromCloudinary('real_estate_offices', office.photo.path);
                        // await manager.remove(Upload, office.photo);
                    }

                    const result = await this.uploadsService.uploadImageToCloudinary('real_estate_offices', file);
                    const newUpload = manager.create(Upload, {
                        path: result.secure_url,
                        size: file.size,
                        type: 'IMAGE',
                    });
                    const savedUpload = await manager.save(newUpload);
                    office.photo = savedUpload;
                }

                await manager.save(office);
                if (previousImage) {
                    await manager.remove(Upload, previousImage);
                }
                return office;
            });
        } catch (error) {
            throw new InternalServerErrorException('Failed to update RealEstateOffice', error.message);
        }
    }
}
