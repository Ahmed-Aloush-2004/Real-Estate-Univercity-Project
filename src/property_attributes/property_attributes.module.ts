import { Module } from '@nestjs/common';
import { PropertyAttributesService } from './property_attributes.service';
import { PropertyAttributesController } from './property_attributes.controller';

@Module({
  controllers: [PropertyAttributesController],
  providers: [PropertyAttributesService],
})
export class PropertyAttributesModule {}
