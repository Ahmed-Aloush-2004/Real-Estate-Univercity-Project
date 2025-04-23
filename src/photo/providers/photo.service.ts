import { Injectable } from '@nestjs/common';
import { CloudinaryProvider } from './cloudinary.provider';
import { UploadApiResponse } from 'cloudinary';
import { InjectRepository } from '@nestjs/typeorm';
import { Photo } from '../photo.entity';
import { EntityManager, Repository } from 'typeorm';

@Injectable()
export class PhotoService {
    constructor(
        private readonly cloudinaryProvider: CloudinaryProvider,

        @InjectRepository(Photo)
        private readonly photoRepository: Repository<Photo>,
    ) { }


    public async uploadImageToCloudinary(folderName:string,file: Express.Multer.File): Promise<UploadApiResponse> {
        
        return await this.cloudinaryProvider.uploadImageToCloudinary(folderName,file)
    }

    public async deleteImageFromCloudinary(folderName,url: string) {
        return await this.cloudinaryProvider.deleteImageFromCloudinary(folderName,url);
    }

    public async saveUpload(photo: Photo, manager: EntityManager): Promise<Photo> {
        return await manager.save(Photo, photo);
      }
      
      

    



}
