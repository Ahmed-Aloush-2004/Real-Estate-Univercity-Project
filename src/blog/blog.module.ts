import { Module } from '@nestjs/common';
import { BlogService } from './blog.service';
import { BlogController } from './blog.controller';
import { Blog } from './entities/blog.entity';
import { BlogPhoto } from './entities/blog-photo.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OfficeModule } from 'src/office/office.module';
import { AuthModule } from 'src/auth/auth.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports:[
    TypeOrmModule.forFeature([Blog,BlogPhoto]) ,
    OfficeModule,
    AuthModule,
    JwtModule
  ],
  controllers: [BlogController],
  providers: [BlogService],
})
export class BlogModule {}
