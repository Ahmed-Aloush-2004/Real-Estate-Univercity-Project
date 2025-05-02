import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePropertyTypeDto } from './dto/create-property-type.dto';
import { UpdatePropertyTypeDto } from './dto/update-property-type.dto';
import { PropertyType } from './entities/propertyType.entity';

@Injectable()
export class PropertyTypeService {
  constructor(
    @InjectRepository(PropertyType)
    private readonly propertyTypeRepository: Repository<PropertyType>,
  ) {}

  // إنشاء نوع عقار جديد
  async create(createPropertyTypeDto: CreatePropertyTypeDto): Promise<PropertyType> {
    const propertyType = this.propertyTypeRepository.create(createPropertyTypeDto);
    return await this.propertyTypeRepository.save(propertyType);
  }

  // جلب جميع أنواع العقارات
  async findAll(): Promise<PropertyType[]> {
    return await this.propertyTypeRepository.find();
  }

  // جلب نوع عقار محدد بالمعرّف
  async findOne(id: number): Promise<PropertyType> {
    const type = await this.propertyTypeRepository.findOne({ where: { id } });
    if (!type) {
      throw new NotFoundException(`Property type with ID ${id} not found`);
    }
    return type;
  }

  // تحديث نوع العقار
  async update(id: number, updatePropertyTypeDto: UpdatePropertyTypeDto): Promise<PropertyType> {
    const type = await this.findOne(id);
    const updated = Object.assign(type, updatePropertyTypeDto);
    return await this.propertyTypeRepository.save(updated);
  }

  // حذف نوع العقار
  async remove(id: number): Promise<void> {
    const type = await this.findOne(id);
    await this.propertyTypeRepository.remove(type);
  }
}
