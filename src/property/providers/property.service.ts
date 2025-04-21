import { Injectable } from '@nestjs/common';
import { CreatePropertyDto } from '../dtos/create-property.dto';
import { UpdatePropertyDto } from '../dtos/update-property.dto';
import { CreatePropertyProvider } from './create-property.provider';
import { UpdatePropertyProvider } from './update-property.provider';
import { DeletePropertyProvider } from './delete-property.provider';

@Injectable()
export class PropertyService {
    constructor(
        private readonly createPropertyProvider: CreatePropertyProvider,
        private readonly updatePropertyProvider: UpdatePropertyProvider,
        private readonly deletePropertyProvider: DeletePropertyProvider,
    ) { }

    public async createProperty(
        createPropertyDto: CreatePropertyDto,
        files?: Express.Multer.File[],
    ) {
        return await this.createPropertyProvider.createProperty(createPropertyDto,files);
     }

     public async updateProperty(
        id: string,
        updatePropertyDto: UpdatePropertyDto,
        files?: Express.Multer.File[],
    ) {
        return await this.updatePropertyProvider.updateProperty(id,updatePropertyDto,files);
     }


     public async deleteProperty(
        id: string,
    ) {
        return await this.deletePropertyProvider.deleteProperty(id);
     }



}
