import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Property } from '../entities/property.entity';
import { Attribute } from 'src/attribute/entities/attribute.entity';
import { PropertyAttribute } from 'src/property-attribute/entities/property-attribute.entity';
import { PropertyType } from 'src/property-type/entities/propertyType.entity';

@Injectable()
export class PropertyService {
  constructor(
    @InjectRepository(Property)
    private propertyRepository: Repository<Property>,
    @InjectRepository(PropertyType)
    private propertyTypeRepository: Repository<PropertyType>,
    @InjectRepository(PropertyAttribute)
    private propertyAttributeRepository: Repository<PropertyAttribute>,
    @InjectRepository(Attribute)
    private attributeRepository: Repository<Attribute>,
  ) {}

  // إضافة خاصية جديدة مع نوعها
  async createPropertyWithType(data: any): Promise<Property[]> {
    const propertyType = await this.propertyTypeRepository.save(data.propertyType);
    const property = this.propertyRepository.create({
      ...data.property,
      propertyType: propertyType,
    });
     this.propertyRepository.save(property);
     return property;
  }

  // إضافة خاصية مع سمات النوع
  async createPropertyWithTypeAttributes(data: any): Promise<Property[]> {
    const propertyType = await this.propertyTypeRepository.save(data.propertyType);
    const attributes = await this.attributeRepository.save(data.attributes);

    const property = this.propertyRepository.create({
      ...data.property,
      propertyType: propertyType,
    });

    const savedProperty = await this.propertyRepository.save(property);

    // إضافة السمات المرتبطة بـ propertyType
    for (const attribute of attributes) {
      const propertyTypeAttribute = this.propertyAttributeRepository.create({
        propertyType: propertyType,
        attribute: attribute,
        value: data.attributeValues[attribute.UniqueID],
      });
      await this.propertyAttributeRepository.save(propertyTypeAttribute);
    }

    return savedProperty;
  }
}
