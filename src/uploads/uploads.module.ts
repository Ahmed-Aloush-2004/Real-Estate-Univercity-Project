import { Module } from '@nestjs/common';
import { UploadsService } from './providers/uploads.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import cloudinaryConfig from 'src/config/cloudinary.config';
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryProvider } from './providers/cloudinary.provider';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Upload } from './upload.entity';
@Module({
  imports:[
    ConfigModule.forFeature(cloudinaryConfig),
    TypeOrmModule.forFeature([Upload]),
    
  ],
  controllers:[],
  providers: [
    UploadsService,
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
  exports:[UploadsService],
})
export class UploadsModule {}



