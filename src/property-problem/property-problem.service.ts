import { forwardRef, Inject, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { PropertyProblem } from './property-problem.entity';
import { CreatePropertyProblemDto } from './dtos/create-property-problem.dto';
import { PropertyService } from 'src/property/providers/property.service';
import { InjectRepository } from '@nestjs/typeorm';
import { PropertyProblemType } from './enums/property-problem.enum';

@Injectable()
export class PropertyProblemService {
    constructor(

        @InjectRepository(PropertyProblem)
        private readonly propertyProblemRepository: Repository<PropertyProblem>,

        @Inject(forwardRef(() => PropertyService))
        private readonly propertyService: PropertyService,
    ) { }

    public async addPropertyProblem(createPropertyProblemDto:CreatePropertyProblemDto){
    // public async addPropertyProblem(createPropertyProblemDto: { name: PropertyProblemType, propertyId: string }) {

        try {

            let property = await this.propertyService.getPropertyById(createPropertyProblemDto.propertyId);

            if(!property){
                throw new NotFoundException()
            }

            let problem = this.propertyProblemRepository.create({
                name: createPropertyProblemDto.name,
                property,
            });

            problem = await this.propertyProblemRepository.save(problem);

            return problem;


        } catch (error) {
            console.error('Error deleting property:', error);
            throw new InternalServerErrorException('Failed to create problem property.');
        }


    }


    public async deletePropertyProblem(propertyProblemId: string) {

        try {


            let propertyProblem = await this.propertyProblemRepository.findOne({
                where: {
                    id: propertyProblemId,
                }
            })

            if (!propertyProblem) {
                throw new NotFoundException(`Problem with this id:${propertyProblemId}, it doesn't found.`)
            }

            await this.propertyProblemRepository.delete(propertyProblemId)



        } catch (error) {
            console.error('Error deleting property:', error);
            throw new InternalServerErrorException('Failed to delete property.');
        }


    }
}
