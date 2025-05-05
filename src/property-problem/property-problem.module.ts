import { forwardRef, Module } from '@nestjs/common';
import { PropertyProblemService } from './property-problem.service';
import { PropertyModule } from 'src/property/property.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PropertyProblem } from './property-problem.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([PropertyProblem]),
    forwardRef(() => PropertyModule),
  ],
  providers: [PropertyProblemService],
  exports: [PropertyProblemService],
})
export class PropertyProblemModule { }
