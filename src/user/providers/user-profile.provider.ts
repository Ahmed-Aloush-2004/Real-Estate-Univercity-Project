import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

import { UpdateUserProfileDto } from '../dtos/update-user-profile.dto';
import { NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { Photo } from 'src/photo/photo.entity';
import { PhotoService } from 'src/photo/providers/photo.service';

@Injectable()
export class UserProfileProvider {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,

    private readonly dataSource:DataSource,

    private readonly photoService: PhotoService,
  ) { }


  // Get user profile
  public async getUserProfile(id: string): Promise<User> {
    const user = await this.usersRepository.findOne({
      where: { id },
      relations: ['photo'], // Include the upload relation
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return user;
  }

  


  public async updateUserProfile(
    id: string,
    updateData: UpdateUserProfileDto,
    file?: Express.Multer.File,
  ): Promise<User> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const user = await queryRunner.manager.findOne(User, {
        where: { id },
        relations: ['photo'],
      });

      if (!user) {
        throw new NotFoundException(`User with ID ${id} not found`);
      }

      // Update user fields using nullish coalescing
      Object.assign(user, {
        firstName: updateData.firstName ?? user.firstName,
        lastName: updateData.lastName ?? user.lastName,
        phoneNumber: updateData.phoneNumber ?? user.phoneNumber,
      });

      // Handle photo update
      if (file) {
        const existingPhoto = user.photo;

        if (existingPhoto) {
          try {
            await this.photoService.deleteImageFromCloudinary(existingPhoto.publicId);
            await queryRunner.manager.delete(Photo, { id: existingPhoto.id });
          } catch (error) {
            throw new InternalServerErrorException('Failed to delete existing photo');
          }
        }

        // Upload new photo
        const uploadResponse = await this.photoService.uploadImageToCloudinary('users', file);

        const newPhoto = new Photo();
        newPhoto.url = uploadResponse.secure_url;
        newPhoto.publicId = uploadResponse.public_id;

        const savedPhoto = await queryRunner.manager.save(Photo, newPhoto);
        user.photo = savedPhoto;
      }

      const updatedUser = await queryRunner.manager.save(User, user);
      await queryRunner.commitTransaction();
      return updatedUser;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new InternalServerErrorException('An error occurred while updating the user profile');
    } finally {
      await queryRunner.release();
    }
  }


  
  
  public async deleteUserProfileData(id: string): Promise<void> {
    const queryRunner = this.usersRepository.manager.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    
    try {
      const user = await queryRunner.manager.findOne(User, {
        where: { id },
        relations: ['photo'],
      });
      
      if (!user) {
        throw new NotFoundException(`User with ID ${id} not found`);
      }
      
      const photoId = user.photo?.id;
      const publicId = user.photo?.publicId;
      
      // Disassociate photo from user first
      user.firstName = null;
      user.lastName = null;
      user.photo = null;
      
      await queryRunner.manager.save(User, user); // Save changes
      
      // Then delete the photo from DB
      if (photoId && publicId) {
        await this.photoService.deleteImageFromCloudinary(publicId);
        await queryRunner.manager.delete(Photo, { id: photoId });
      }
      
      await queryRunner.commitTransaction();
      
    } catch (error) {
      console.error(error);
      await queryRunner.rollbackTransaction();
      throw new InternalServerErrorException('An error occurred while deleting the user profile data');
    } finally {
      await queryRunner.release();
    }
  }
  
  
  
  
  
  
  
  
  
}

// public async updateUserProfile(
//   id: string,
//   updateData: UpdateUserProfileDto,
//   file?: Express.Multer.File,
// ): Promise<User> {
//   const queryRunner = this.usersRepository.manager.connection.createQueryRunner();

//   // Start the transaction
//   await queryRunner.startTransaction();

//   try {
//     const user = await queryRunner.manager.findOne(User, {
//       where: { id },
//       relations: ['photo'],
//     });


//     if (!user) {
//       throw new NotFoundException(`User with ID ${id} not found`);
//     }

//     // Update user fields
//     user.firstName = updateData.firstName || user.firstName;
//     user.lastName = updateData.lastName || user.lastName;
//     user.phoneNumber = updateData.phoneNumber || user.phoneNumber;
//     // user.email = updateData.email || user.email;

//     // If a new file is provided, handle the image upload

//     console.log('user data',user);
    

//     if (file) {
//     console.log('file',file);

//       const existingPhoto = user.photo;

//       if (existingPhoto) {
//         // Delete the old image from Cloudinary
        
//        let variable = await this.photoService.deleteImageFromCloudinary(user.photo.publicId);
//         console.log("variable",variable);

          
//           await queryRunner.manager.delete(Photo, {
//             id: user.photo.id
//           })
   
        
//       }

//       // Upload new image

//       const uploadResponse = await this.photoService.uploadImageToCloudinary('users', file);
//       // Create a new upload entity
//       console.log(" // Create a new upload entity",uploadResponse);

//       const newPhoto = new Photo();
//       // newUpload.name = uploadResponse.public_id;
//       newPhoto.url = uploadResponse.secure_url;
//       newPhoto.publicId = uploadResponse.public_id;
//       // newUpload.user = user;

//       // Save the new upload entity
//       const savedPhoto = await queryRunner.manager.save(Photo, newPhoto);


//       // Assign the upload to the user
//       user.photo = savedPhoto;
//       console.log('// Assign the upload to the user ',user);
      
//     }

    
//     // Save updated user
//     const updatedUser = await queryRunner.manager.save(User, user);

//     // Commit the transaction
//     await queryRunner.commitTransaction();

//     return updatedUser;
//   } catch (error) {

//     // If something goes wrong, rollback the transaction
//     await queryRunner.rollbackTransaction();
//     throw new InternalServerErrorException('An error occurred while updating the user profile');
//   } finally {
//     // Release the query runner

//     await queryRunner.release();


//   }
// }
// // Delete user profile and their associated image
// public async deleteUserProfileData(id: string): Promise<void> {
  


//   const queryRunner = this.usersRepository.manager.connection.createQueryRunner();
//   let user;
//   let photoId;
//   // Start the transaction
//   await queryRunner.startTransaction();

//   try {
//     user = await queryRunner.manager.findOne(User, {
//       where: { id },
//       relations: ['photo'],
//     });

//     if (!user) {
//       throw new NotFoundException(`User with ID ${id} not found`);
//     }

//     // Delete the associated image from Cloudinary
//     if (user.photo) {
//       await this.photoService.deleteImageFromCloudinary(user.photo.publicId);
//       // photoId = user.photo.id;
//       await queryRunner.manager.delete(Photo,{
//         id:user.photo.id
//       });

//     }

//     user.firstName = null;
//     user.lastName = null;
//     user.photo = null;

//     // Remove the user from the database
//     await queryRunner.manager.save(User, user);
//     // await queryRunner.manager.delete(Photo, {
//     //   id:photoId
//     // });

//     // Commit the transaction
//     await queryRunner.commitTransaction();
//   } catch (error) {
//     console.log(error);

//     // Rollback the transaction if an error occurs
//     await queryRunner.rollbackTransaction();
//     throw new InternalServerErrorException('An error occurred while deleting the user profile data');
//   } finally {
//     // Release the query runner
//     await queryRunner.release();
//   }
// }