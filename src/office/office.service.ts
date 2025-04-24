// real-estate-office.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Office } from './office.entity';
import { UpdateOfficeDto } from './dtos/update-office.dto';
import { CreateOfficeProvider } from './providers/create-office.provider';
import { UpdateOfficeProvider } from './providers/update-office.provider';
import { DeleteOfficeProvider } from './providers/delete-office.provider';
import { CreateOfficeDto } from './dtos/create-office.dto';

@Injectable()
export class OfficeService {
    constructor(
        @InjectRepository(Office)
        private readonly repo: Repository<Office>,
        private readonly createProvider: CreateOfficeProvider,
        private readonly updateProvider: UpdateOfficeProvider,
        private readonly deleteProvider: DeleteOfficeProvider,
    ) { }

    async getOfficeById(realEstateOfficeId: string) {
        let office = await this.repo.findOne({
            where: {
                id: realEstateOfficeId 
            }, relations: ['license', 'manager']
        })
        if(!office){
            throw new NotFoundException(`the real estate office with this id:${realEstateOfficeId}. it doesn't exist.`)
        }
        
        return office;
    }

    async getMyOffice(officeId: string) {
        let office = await this.repo.findOne({
            where: {
                id: officeId 
            }, relations: ['license', 'manager']
        })
        if(!office){
            throw new NotFoundException(`the real estate office with this id:${officeId}. it doesn't exist.`)
        }
        
        return office;
    }




    async createOffice(dto: CreateOfficeDto, file: Express.Multer.File, managerId: string) {
        return this.createProvider.createOffice(dto, file, managerId);
    }

    async updateMyOffice(
      ManagerId:string,
        dto: UpdateOfficeDto,
        // file?: Express.Multer.File
      ) {
        return await this.updateProvider.updateOffice(ManagerId, dto
            // , file
        );
      }
      

    async deleteMyOffice(ManagerId: string) {
        console.log("user",ManagerId);
        
        return await this.deleteProvider.deleteOffice(ManagerId);
    }
}