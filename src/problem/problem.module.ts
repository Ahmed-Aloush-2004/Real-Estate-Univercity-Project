import { Module } from '@nestjs/common';
import { ProblemService } from './problem.service';
import { ProblemController } from './problem.controller';
import { Problem } from './entities/problem.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Property_Problem } from 'src/property/property_problem.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Problem])],
  exports:[ProblemModule],
  controllers: [ProblemController],
  providers: [ProblemService],
})
export class ProblemModule {}
