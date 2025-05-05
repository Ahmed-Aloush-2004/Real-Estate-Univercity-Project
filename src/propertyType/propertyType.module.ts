import { Module } from '@nestjs/common';
import { PropertyTypeService } from './propertyType.service';
import { PropertyTypeController } from './propertyType.controller';
import { PropertyType } from './entities/propertyType.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AttributeModule } from 'src/attribute/attribute.module';

@Module({
  imports:[TypeOrmModule.forFeature([PropertyType ]),AttributeModule],
  controllers: [PropertyTypeController],
  providers: [PropertyTypeService],
  exports:[PropertyTypeService]
})
export class PropertyTypeModule {}
