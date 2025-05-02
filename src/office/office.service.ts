// real-estate-office.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Office } from './entities/office.entity';
import { UpdateOfficeDto } from './dtos/update-office.dto';
import { CreateOfficeProvider } from './providers/create-office.provider';
import { UpdateOfficeProvider } from './providers/update-office.provider';
import { DeleteOfficeProvider } from './providers/delete-office.provider';
import { CreateOfficeDto } from './dtos/create-office.dto';

@Injectable()
export class OfficeService {
    constructor(
        @InjectRepository(Office)
        private readonly officeRepository: Repository<Office>,
        private readonly createProvider: CreateOfficeProvider,
        private readonly updateProvider: UpdateOfficeProvider,
        private readonly deleteProvider: DeleteOfficeProvider,
    ) { }


    public async getAllOffices(){
        return await this.officeRepository.find({
            relations:['properties']
        })
    } 
 

   public async getOfficeById(OfficeId: string) {
        let office = await this.officeRepository.findOne({
            where: {
                id: OfficeId 
            }, relations: ['license', 'manager']
        })
        if(!office){
            throw new NotFoundException(`the real estate office with this id:${OfficeId}. it doesn't exist.`)
        }
        return office;
    }

    async getMyOffice(userId: string) {
        const office = await this.officeRepository.findOne({
            where: {
                manager: {id:userId}, 
            }
        })
        if(!office){
            throw new NotFoundException(`the real estate office with this id:${office.id}. it doesn't exist.`)
        }
        return office;
    }




    async createOffice(createOfficeDto: CreateOfficeDto, file: Express.Multer.File, managerId: string) {
        return this.createProvider.createOffice(createOfficeDto, file, managerId);
    }

    async updateMyOffice(
      ManagerId:string,
        updateOfficeDto: UpdateOfficeDto,
        // file?: Express.Multer.File
      ) {
        return await this.updateProvider.updateOffice(ManagerId, updateOfficeDto
            // , file
        );
      }
      

    async deleteMyOffice(ManagerId: string) {        
        return await this.deleteProvider.deleteOffice(ManagerId);
    }
}