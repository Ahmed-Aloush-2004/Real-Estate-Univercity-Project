import { Module } from '@nestjs/common';
import { PhotoService } from './providers/photo.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import cloudinaryConfig from 'src/config/cloudinary.config';
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryProvider } from './providers/cloudinary.provider';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Photo } from './photo.entity';
@Module({
  imports:[
    ConfigModule.forFeature(cloudinaryConfig),
    TypeOrmModule.forFeature([Photo]),
    
  ],
  controllers:[],
  providers: [
    PhotoService,
    {
      provide: 'CLOUDINARY',
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        cloudinary.config({
          cloud_name: configService.get<string>('cloudinaryConfig.cloud_name'),
          api_key: configService.get<string>('cloudinaryConfig.api_key'),
          api_secret: configService.get<string>('cloudinaryConfig.api_secret'),
        });        
        return cloudinary;
      },
    },
    CloudinaryProvider,
    
  ],
  exports:[PhotoService],
})
export class PhotoModule {}



