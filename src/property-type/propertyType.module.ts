import { Module } from '@nestjs/common';
import { PropertyTypeService } from './propertyType.service';
import { PropertyTypeController } from './propertyType.controller';
import { PropertyType } from './entities/propertyType.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports:[TypeOrmModule.forFeature([PropertyType])],
  controllers: [PropertyTypeController],
  providers: [PropertyTypeService],
})
export class PropertyTypeModule {}
