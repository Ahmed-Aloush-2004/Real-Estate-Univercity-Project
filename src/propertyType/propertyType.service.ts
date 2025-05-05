import { ForbiddenException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { CreatePropertyTypeDto } from './dto/create-propertyType.dto';
import { UpdatePropertyTypeDto } from './dto/update-propertyType.dto';
import { PropertyType } from './entities/propertyType.entity';
import { CreatePropertyAttributeDto } from '../property/dtos/create-property-attribute.dto';
import { CreateAttributeDto } from 'src/attribute/dto/create-attribute.dto';
import { Attribute } from 'src/attribute/entities/attribute.entity';

@Injectable()
export class PropertyTypeService {
  constructor(
    @InjectRepository(PropertyType)
    private readonly propertyTypeRepository: Repository<PropertyType>,
    private readonly dataSource: DataSource,
    @InjectRepository(Attribute)
    private readonly attributeRepository: Repository<Attribute>,
  ) {}

  async createPropertyType(createPropertyTypeDto: CreatePropertyTypeDto){
    let newType: PropertyType | null = null;
    try{
      newType = await this.propertyTypeRepository.findOne({
        where: {
            name: createPropertyTypeDto.name
        }
    });
    }catch(error){
      throw new InternalServerErrorException("Something went wrong");
    }
    
    if(newType){
      throw new ForbiddenException("this type already exist");
    }
    newType = await this.propertyTypeRepository.create(createPropertyTypeDto);

    await this.propertyTypeRepository.save(newType);

    return newType;
  }

  async addAttributeToPropertyType(typeId: string, newAttributeDto: CreateAttributeDto) {
    const { name } = newAttributeDto;
    let propertyType = await this.getPropertyType(typeId);
    let newAttribute = null;
    // 1. البحث عن نوع العقار المحدد مع تحميل الخصائص المرتبطة به

    

    if (!propertyType) {
      throw new NotFoundException(`Property type with ID ${typeId} not found`);
    }
  
    for(const attribute of propertyType.attributes)
      if(attribute.name === name)
        throw new ForbiddenException("this attribute already binded with this propertyType");

    // 2. إنشاء كائن attribute جديد
    try{
       newAttribute = await this.attributeRepository.findOne({ 
      where:{name: name}
    });
  }catch(error){
    throw new InternalServerErrorException("something went wrong");
  }

    if(!newAttribute)
      newAttribute = await this.attributeRepository.create(newAttributeDto);

    // 3. ربطه بخصائص النوع
    propertyType.attributes.push(newAttribute);
  
    // 4. حفظ التحديث
    await this.propertyTypeRepository.save(propertyType);
  
    return propertyType;
  }

  async getPropertyType(typeId: string){
    let propertyType = null;
    try{
      propertyType = await this.propertyTypeRepository.findOne({
      where:{id: typeId},
      relations:['attributes']
     });
    }
    catch(error){
     throw new InternalServerErrorException("something went wrong");
    }
    return propertyType;
  }

  async getPropertyTypeWithNoAttributes(typeId: string){
    let propertyType = null;
    try{
      propertyType = await this.propertyTypeRepository.findOne({
      where:{id: typeId},
     });
    }
    catch(error){
     throw new InternalServerErrorException("something went wrong");
    }
    return propertyType;
  }

  async getPropertyTypeAttributes(typeId: string){
    let propertyType = await this.getPropertyType(typeId);
    return propertyType.attributes;

  }

  async getAllTypes(){
    const propertyTypes = await this.propertyTypeRepository.find();

    return propertyTypes;
  }

}