import { Module } from '@nestjs/common';
import { PropertyCommentsService } from './property_comments.service';
import { PropertyCommentsController } from './property_comments.controller';

@Module({
  controllers: [PropertyCommentsController],
  providers: [PropertyCommentsService],
})
export class PropertyCommentsModule {}
