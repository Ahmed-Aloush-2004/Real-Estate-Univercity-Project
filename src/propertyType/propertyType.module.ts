import { Module } from '@nestjs/common';
import { PropertyTypeService } from './propertyType.service';
import { PropertyTypeController } from './propertyType.controller';
import { PropertyTypee } from './entities/propertyType.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports:[TypeOrmModule.forFeature([PropertyTypee])],
  controllers: [PropertyTypeController],
  providers: [PropertyTypeService],
})
export class PropertyTypeModule {}
