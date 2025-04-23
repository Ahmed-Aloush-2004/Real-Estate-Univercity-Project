import { Inject, Injectable } from '@nestjs/common';
import { UploadApiResponse, v2 as cloudinary, UploadApiErrorResponse } from 'cloudinary';
import toStream = require('buffer-to-stream');

@Injectable()
export class CloudinaryProvider {
  constructor(
    @Inject('CLOUDINARY') private cloudinary,
  ) { }

  public async uploadImageToCloudinary(folderName:string,file: Express.Multer.File): Promise<UploadApiResponse> {
    return new Promise((resolve, reject) => {
      const photo = cloudinary.uploader.upload_stream(
        { folder: folderName }, // optional folder
        (error: UploadApiErrorResponse, result: UploadApiResponse) => {
          if (error) { return reject(error); }

          resolve(result);
        },
      );

      toStream(file.buffer).pipe(photo);
    });
  }

  public async deleteImageFromCloudinary(folderName:string,url: string) {

    let publicId = this.extractPublicId(folderName,url);

    return await cloudinary.uploader.destroy(publicId);
  }



  private extractPublicId(folderName:string,url: string): string {
    const parts = url.split('/');
    
    const fileWithExtension = parts.pop(); // "zfwjt9rq9iybgnm7sitb.jpg"

    parts.pop(); // Remove version (e.g., "v1745054681")
    
    // const folder = parts.slice(-1)[0]; // "nestjs"
    const fileName = fileWithExtension?.split('.')[0]; // "zfwjt9rq9iybgnm7sitb"

    if (!folderName || !fileName) {
      throw new Error('Invalid Cloudinary URL');
    }
    return `${folderName}/${fileName}`; // "nestjs/zfwjt9rq9iybgnm7sitb"
  }
  

}
