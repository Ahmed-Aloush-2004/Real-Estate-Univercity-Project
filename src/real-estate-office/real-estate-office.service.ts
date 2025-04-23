// real-estate-office.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RealEstateOffice } from './real-estate-office.entity';
import { CreateRealEstateOfficeDto } from './dtos/create-real-estate-office.dto';
import { UpdateRealEstateOfficeDto } from './dtos/update-real-estate-office.dto';
import { CreateRealEstateOfficeProvider } from './providers/create-real-estate-office.provider';
import { UpdateRealEstateOfficeProvider } from './providers/update-real-estate-office.provider';
import { DeleteRealEstateOfficeProvider } from './providers/delete-real-estate-office.provider';

@Injectable()
export class RealEstateOfficeService {
    constructor(
        @InjectRepository(RealEstateOffice)
        private readonly repo: Repository<RealEstateOffice>,
        private readonly createProvider: CreateRealEstateOfficeProvider,
        private readonly updateProvider: UpdateRealEstateOfficeProvider,
        private readonly deleteProvider: DeleteRealEstateOfficeProvider,
    ) { }

    async getRealEstateOfficeById(realEstateOfficeId: string) {
        let realEstateOffice = await this.repo.findOne({
            where: {
                id: realEstateOfficeId 
            }, relations: ['photo', 'manager']
        })
        if(!realEstateOffice){
            throw new NotFoundException(`the real estate office with this id:${realEstateOfficeId}. it doesn't exist.`)
        }
        console.log(realEstateOffice);
        
        return realEstateOffice;
    }

    async getMyRealEstateOffice(realEstateOfficeId: string) {
        let realEstateOffice = await this.repo.findOne({
            where: {
                id: realEstateOfficeId 
            }, relations: ['photo', 'manager']
        })
        if(!realEstateOffice){
            throw new NotFoundException(`the real estate office with this id:${realEstateOfficeId}. it doesn't exist.`)
        }
        
        return realEstateOffice;
    }




    async create(dto: CreateRealEstateOfficeDto, file: Express.Multer.File, managerId: string) {
        return this.createProvider.createRealEstateOffice(dto, file, managerId);
    }

    async update(
      ManagerId:string,
        dto: UpdateRealEstateOfficeDto,
        file?: Express.Multer.File
      ) {
        return await this.updateProvider.updateRealEstateOffice(ManagerId, dto, file);
      }
      

    async deleteMyRealEstateOffice(ManagerId: string) {
        return await this.deleteProvider.deleteRealEstateOffice(ManagerId);
    }
}