import { Injectable, NotFoundException, RequestTimeoutException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Property } from '../entities/property.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class GetPropertyByIdProvider {

    constructor(
        @InjectRepository(Property)
        private readonly propertyRepository: Repository<Property>,
    ) { }

    public async getPropertyById(id: string) {
        try {
            let property = await this.propertyRepository.findOne({
                where:{
                    id
                },
                relations:['office','photos','location','propertyComments']
            })
            if (!property) throw new NotFoundException(`Property with this id:${id} doesn't exist.`)
            return property;
        } catch (error) {
            if (error instanceof NotFoundException) throw error;

            throw new RequestTimeoutException(error, {
                description: 'Something happen when we were connecting with the DB'
            })
        }
    }

}
