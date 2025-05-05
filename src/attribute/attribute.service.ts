import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAttributeDto } from './dto/create-attribute.dto';
import { UpdateAttributeDto } from './dto/update-attribute.dto';
import { Attribute } from './entities/attribute.entity';

@Injectable()
export class AttributeService {
  constructor(
    @InjectRepository(Attribute)
    private readonly attributeRepository: Repository<Attribute>,
  ) {}

  // إنشاء خاصية جديدة
  async create(createAttributeDto: CreateAttributeDto): Promise<Attribute> {
    const attribute = this.attributeRepository.create(createAttributeDto);
    return await this.attributeRepository.save(attribute);
  }

  // إحضار جميع الخصائص
  async findAll(): Promise<Attribute[]> {
    return await this.attributeRepository.find();
  }

  // إحضار خاصية واحدة بالمعرّف
  async findOne(id: string): Promise<Attribute> {
    const attribute = await this.attributeRepository.findOne({ where: { id } });
    if (!attribute) {
      throw new NotFoundException(`Attribute with ID ${id} not found`);
    }
    return attribute;
  }

  // تحديث خاصية
  async update(id: string, updateAttributeDto: UpdateAttributeDto): Promise<Attribute> {
    const attribute = await this.findOne(id);
    const updated = Object.assign(attribute, updateAttributeDto);
    return await this.attributeRepository.save(updated);
  }

  // حذف خاصية
  async remove(id: string): Promise<void> {
    const attribute = await this.findOne(id);
    await this.attributeRepository.remove(attribute);
  }
}
