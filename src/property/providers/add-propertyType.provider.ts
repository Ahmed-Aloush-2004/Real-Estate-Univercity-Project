import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Property } from '../entities/property.entity';
import { PropertyTypee } from 'src/propertyType/entities/propertyType.entity';
import { PropertyTypeAttribute } from 'src/propertyType-attribute/entities/propertyType-attribute.entity';
import { Attribute } from 'src/attribute/entities/attribute.entity';

@Injectable()
export class PropertyService {
  constructor(
    @InjectRepository(Property)
    private propertyRepository: Repository<Property>,
    @InjectRepository(PropertyTypee)
    private propertyTypeRepository: Repository<PropertyTypee>,
    @InjectRepository(PropertyTypeAttribute)
    private propertyTypeAttributeRepository: Repository<PropertyTypeAttribute>,
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
      const propertyTypeAttribute = this.propertyTypeAttributeRepository.create({
        propertyType: propertyType,
        attribute: attribute,
        value: data.attributeValues[attribute.UniqueID],
      });
      await this.propertyTypeAttributeRepository.save(propertyTypeAttribute);
    }

    return savedProperty;
  }
}
