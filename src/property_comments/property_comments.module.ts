import { Module } from '@nestjs/common';
import { PropertyCommentsService } from './property_comments.service';
import { PropertyCommentsController } from './property_comments.controller';
import { Property_Comments } from './entities/property_comment.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports:[TypeOrmModule.forFeature([Property_Comments])],
  controllers: [PropertyCommentsController],
  providers: [PropertyCommentsService],
})
export class PropertyCommentsModule {}
