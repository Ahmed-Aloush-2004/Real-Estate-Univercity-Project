import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PropertyAttribute } from './entities/property-attribute.entity';
import { CreatePropertyAttributeDto  } from './dto/create-property-attribute.dto';
import { UpdatePropertyAttributeDto } from './dto/update-property-attribute.dto';
import { Attribute } from 'src/attribute/entities/attribute.entity';
import { Property } from 'src/property/entities/property.entity';

@Injectable()
export class PropertyAttributeService {
  constructor(
    @InjectRepository(PropertyAttribute)
    private readonly propertyAttributeRepository: Repository<PropertyAttribute>,

    @InjectRepository(Property)
    private readonly propertyRepository: Repository<Property>,

    @InjectRepository(Attribute)
    private readonly attributeRepository: Repository<Attribute>,
  ) {}

  // إنشاء علاقة جديدة بين خاصية ونوع خاصية
  async create(
    dto: CreatePropertyAttributeDto,
  ): Promise<PropertyAttribute> {
    const attribute = await this.attributeRepository.findOne({
      where: { id: dto.attributeId },
    });
    if (!attribute) {
      throw new NotFoundException(`Attribute with ID ${dto.attributeId} not found`);
    }

    const property = await this.propertyRepository.findOne({
      where: { id: dto.propertyId },
    });
    if (!property) {
      throw new NotFoundException(`Property with ID ${dto.propertyId} not found`);
    }

    const propertyAttribute = this.propertyAttributeRepository.create({
      attribute,
      property,
      number: Number(dto.number),
    });

    return await this.propertyAttributeRepository.save(propertyAttribute);
  }

  // جلب كل العلاقات
  async findAll(): Promise<PropertyAttribute[]> {
    return await this.propertyAttributeRepository.find();
  }

  // جلب علاقة واحدة
  async findOne(id: string): Promise<PropertyAttribute> {
    const relation = await this.propertyAttributeRepository.findOne({
      where: { id },
    });

    if (!relation) {
      throw new NotFoundException(`PropertyAttribute with ID ${id} not found`);
    }

    return relation;
  }

  // تحديث العلاقة
  async update(
    id: string,
    dto: UpdatePropertyAttributeDto,
  ): Promise<PropertyAttribute> {
    const relation = await this.findOne(id);

    if (dto.attributeId) {
      const attribute = await this.attributeRepository.findOne({
        where: { id: dto.attributeId },
      });
      if (!attribute) {
        throw new NotFoundException(`Attribute with ID ${dto.attributeId} not found`);
      }
      relation.attribute = attribute;
    }

    if (dto.propertyId) {
      const property = await this.propertyRepository.findOne({
        where: { id: dto.propertyId },
      });
      if (!property) {
        throw new NotFoundException(`Property with ID ${dto.propertyId} not found`);
      }
      relation.property = property;
    }

    if (dto.number !== undefined) {
      relation.number = Number(dto.number);
    }

    return await this.propertyAttributeRepository.save(relation);
  }

  // حذف العلاقة
  async remove(id: string): Promise<void> {
    const relation = await this.findOne(id);
    await this.propertyAttributeRepository.remove(relation);
  }
}
