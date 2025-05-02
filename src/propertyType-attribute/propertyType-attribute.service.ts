import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PropertyTypeAttribute } from './entities/propertyType-attribute.entity';
import { CreatePropertyTypeAttributeDto } from './dto/create-propertyType-attribute.dto';
import { UpdatePropertyTypeAttributeDto } from './dto/update-propertyType-attribute.dto';
import { PropertyTypee } from 'src/propertyType/entities/propertyType.entity';
import { Attribute } from 'src/attribute/entities/attribute.entity';

@Injectable()
export class PropertyTypeAttributeService {
  constructor(
    @InjectRepository(PropertyTypeAttribute)
    private readonly ptAttrRepo: Repository<PropertyTypeAttribute>,
    @InjectRepository(PropertyTypeAttribute)
    private readonly propertyTypeRepo: Repository<PropertyTypee>,
    @InjectRepository(PropertyTypeAttribute)
    private readonly attributeRepo: Repository<Attribute>,
  
  ) {}

  // إنشاء
  async create(dto: CreatePropertyTypeAttributeDto): Promise<PropertyTypeAttribute> {
    const propertyType = await this.propertyTypeRepo.findOneBy({ id: dto.propertyTypeId });
    const attribute = await this.attributeRepo.findOneBy({ id: dto.attributeId });
  
    if (!propertyType || !attribute) {
      throw new NotFoundException('Property type or attribute not found');
    }
  
    const entity = this.ptAttrRepo.create({
      propertyType,
      attribute,
      value: dto.value,
    });
  
    return await this.ptAttrRepo.save(entity);
  }
  

  // جلب الكل
  async findAll(): Promise<PropertyTypeAttribute[]> {
    return await this.ptAttrRepo.find({ relations: ['propertyType', 'attribute'] });
  }

  // جلب عنصر واحد
  async findOne(id: number): Promise<PropertyTypeAttribute> {
    const entity = await this.ptAttrRepo.findOne({ where: { id }, relations: ['propertyType', 'attribute'] });
    if (!entity) throw new NotFoundException(`PropertyTypeAttribute #${id} not found`);
    return entity;
  }

  // تحديث
  async update(id: number, dto: UpdatePropertyTypeAttributeDto): Promise<PropertyTypeAttribute> {
    const existing = await this.findOne(id);
    const updated = Object.assign(existing, dto);
    return await this.ptAttrRepo.save(updated);
  }

  // حذف
  async remove(id: number): Promise<void> {
    const entity = await this.findOne(id);
    await this.ptAttrRepo.remove(entity);
  }
}
