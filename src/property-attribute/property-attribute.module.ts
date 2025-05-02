import { Module } from '@nestjs/common';
import { PropertyAttribute } from './entities/property-attribute.entity';
import { PropertyAttributeController } from './property-attribute.controller';
import { PropertyAttributeService } from './property-attribute.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PropertyModule } from 'src/property/property.module';
import { AttributeModule } from 'src/attribute/attribute.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([PropertyAttribute]),
    PropertyModule,
    AttributeModule,
  ],
  controllers: [PropertyAttributeController],
  providers: [PropertyAttributeService],
})
export class PropertyAttributeModule { }
