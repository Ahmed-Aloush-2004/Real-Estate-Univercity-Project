import { Module } from '@nestjs/common';
import { PropertyTypeAttribute } from './entities/propertyType-attribute.entity';
import { PropertyTypeAttributeController } from './propertyType-attribute.controller';
import { PropertyTypeAttributeService } from './propertyType-attribute.service';
import { Attribute } from 'src/attribute/entities/attribute.entity';
import { PropertyTypee } from 'src/propertyType/entities/propertyType.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports:[TypeOrmModule.forFeature([PropertyTypeAttribute, PropertyTypee, Attribute])],
  controllers: [PropertyTypeAttributeController],
  providers: [PropertyTypeAttributeService],
})
export class PropertyType_AttributesModule {}
