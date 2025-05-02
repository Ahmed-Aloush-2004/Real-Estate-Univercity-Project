import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePropertyTypeDto } from './dto/create-property-type.dto';
import { UpdatePropertyTypeDto } from './dto/update-property-type.dto';
import { PropertyTypee } from './entities/propertyType.entity';

@Injectable()
export class PropertyTypeService {
  constructor(
    @InjectRepository(PropertyTypee)
    private readonly propertyTypeRepository: Repository<PropertyTypee>,
  ) {}

  // إنشاء نوع عقار جديد
  async create(createPropertyTypeDto: CreatePropertyTypeDto): Promise<PropertyTypee> {
    const propertyType = this.propertyTypeRepository.create(createPropertyTypeDto);
    return await this.propertyTypeRepository.save(propertyType);
  }

  // جلب جميع أنواع العقارات
  async findAll(): Promise<PropertyTypee[]> {
    return await this.propertyTypeRepository.find();
  }

  // جلب نوع عقار محدد بالمعرّف
  async findOne(id: number): Promise<PropertyTypee> {
    const type = await this.propertyTypeRepository.findOne({ where: { id } });
    if (!type) {
      throw new NotFoundException(`Property type with ID ${id} not found`);
    }
    return type;
  }

  // تحديث نوع العقار
  async update(id: number, updatePropertyTypeDto: UpdatePropertyTypeDto): Promise<PropertyTypee> {
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
