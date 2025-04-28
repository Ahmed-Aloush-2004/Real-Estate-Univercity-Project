import { Module } from '@nestjs/common';
import { BlogService } from './blog.service';
import { BlogController } from './blog.controller';
import { Blog } from './entities/blog.entity';
import { BlogPhoto } from './entities/blog-photo.entity';

@Module({
  imports:[Blog,BlogPhoto],
  controllers: [BlogController],
  providers: [BlogService],
})
export class BlogModule {}
