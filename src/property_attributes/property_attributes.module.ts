import { Module } from '@nestjs/common';
import { PropertyAttributesService } from './property_attributes.service';
import { PropertyAttributesController } from './property_attributes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Property_Attributes } from './entities/property_attribute.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Property_Attributes])],
  controllers: [PropertyAttributesController],
  providers: [PropertyAttributesService],
})
export class PropertyAttributesModule {}
