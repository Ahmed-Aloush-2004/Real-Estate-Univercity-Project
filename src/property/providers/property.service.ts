import { Injectable } from '@nestjs/common';
import { CreatePropertyDto } from '../dtos/create-property.dto';
import { UpdatePropertyDto } from '../dtos/update-property.dto';
import { CreatePropertyProvider } from './create-property.provider';
import { UpdatePropertyProvider } from './update-property.provider';
import { DeletePropertyProvider } from './delete-property.provider';
import { FilterPropertyDto } from '../dtos/filter-property.dto';
import { Property } from '../entities/property.entity';
import { PaginatedResponse } from '../../common/interfaces/response.interface';
import { GetPropertiesWithFilterAndPaginationProvider } from './get-properties-with-filter-and-pagination.provider';
import { GetPropertyByIdProvider } from './get-property-by-id.provider';

@Injectable()
export class PropertyService {
    constructor(
        private readonly createPropertyProvider: CreatePropertyProvider,
        private readonly updatePropertyProvider: UpdatePropertyProvider,
        private readonly deletePropertyProvider: DeletePropertyProvider,
        private readonly getPropertiesWithFilterAndPaginationProvider: GetPropertiesWithFilterAndPaginationProvider,
        private readonly getPropertyByIdProvider: GetPropertyByIdProvider,

    ) { }

    public async getPropertiesWithFilterAndPagination(
        filterDto: FilterPropertyDto,
    ): Promise<PaginatedResponse<Property[]>> {
        
        
        return await this
            .getPropertiesWithFilterAndPaginationProvider
            .getPropertiesWithFilterAndPagination(filterDto);
    }


    public async getPropertyById(id: string) {
        return await this.getPropertyByIdProvider.getPropertyById(id)
    }


    public async createProperty(
        officeManagerId: string,
        createPropertyDto: CreatePropertyDto,
        files?: Express.Multer.File[],
    ) {
        return await this.createPropertyProvider.createProperty(officeManagerId, createPropertyDto, files);
    }

    public async updateProperty(
        officeManagerId: string,
        id: string,
        updatePropertyDto: UpdatePropertyDto,
        files?: Express.Multer.File[],
    ) {
        return await this.updatePropertyProvider.updateProperty(officeManagerId, id, updatePropertyDto, files);
    }


    public async deleteProperty(
        officeManagerId: string,
        id: string,
    ) {
        return await this.deletePropertyProvider.deleteProperty(officeManagerId, id);
    }



}
