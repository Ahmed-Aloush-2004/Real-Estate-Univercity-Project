import { Injectable } from '@nestjs/common';
import { CloudinaryProvider } from './cloudinary.provider';
import { UploadApiResponse } from 'cloudinary';
import { InjectRepository } from '@nestjs/typeorm';
import { Upload } from '../upload.entity';
import { EntityManager, Repository } from 'typeorm';
import { User } from 'src/users/user.entity';

@Injectable()
export class UploadsService {
    constructor(
        private readonly cloudinaryProvider: CloudinaryProvider,

        @InjectRepository(Upload)
        private readonly uploadsRepository: Repository<User>,
    ) { }


    public async uploadImageToCloudinary(folderName:string,file: Express.Multer.File): Promise<UploadApiResponse> {
        
        return await this.cloudinaryProvider.uploadImageToCloudinary(folderName,file)
    }

    public async deleteImageFromCloudinary(folderName,url: string) {
        return await this.cloudinaryProvider.deleteImageFromCloudinary(folderName,url);
    }

    public async saveUpload(upload: Upload, manager: EntityManager): Promise<Upload> {
        return await manager.save(Upload, upload);
      }
      
      

    



}
