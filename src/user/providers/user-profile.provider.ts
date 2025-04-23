import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from '../user.entity';
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

    private readonly photoService: PhotoService,
  ) { }

  static FolderName = 'nestjs'

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

  // Update user profile using a transaction
  public async updateUserProfile(
    id: string,
    updateData: UpdateUserProfileDto,
    file?: Express.Multer.File,
  ): Promise<User> {
    const queryRunner = this.usersRepository.manager.connection.createQueryRunner();

    // Start the transaction
    await queryRunner.startTransaction();

    try {
      const user = await queryRunner.manager.findOne(User, {
        where: { id },
        relations: ['photo'],
      });


      if (!user) {
        throw new NotFoundException(`User with ID ${id} not found`);
      }

      // Update user fields
      user.firstName = updateData.firstName || user.firstName;
      user.lastName = updateData.lastName || user.lastName;
      user.phoneNumber = updateData.phoneNumber || user.phoneNumber;
      // user.email = updateData.email || user.email;

      // If a new file is provided, handle the image upload

      if (file) {
        const existingPhoto = user.photo;

        if (existingPhoto) {
          // Delete the old image from Cloudinary
          await this.photoService.deleteImageFromCloudinary(UserProfileProvider.FolderName, user.photo.url);
          await queryRunner.manager.delete(Photo, {
            id: user.photo.id
          })
        }
        // Upload new image

        const uploadResponse = await this.photoService.uploadImageToCloudinary(UserProfileProvider.FolderName, file);
        // Create a new upload entity
        // console.log(uploadResponse);

        const newPhoto = new Photo();
        // newUpload.name = uploadResponse.public_id;
        newPhoto.url = uploadResponse.secure_url;
        // newUpload.user = user;

        // Save the new upload entity
        const savedPhoto = await queryRunner.manager.save(Photo, newPhoto);


        // Assign the upload to the user
        user.photo = savedPhoto;

      }

      // Save updated user
      const updatedUser = await queryRunner.manager.save(User, user);

      // Commit the transaction
      await queryRunner.commitTransaction();

      return updatedUser;
    } catch (error) {

      // If something goes wrong, rollback the transaction
      await queryRunner.rollbackTransaction();
      throw new InternalServerErrorException('An error occurred while updating the user profile');
    } finally {
      // Release the query runner

      await queryRunner.release();


    }
  }

  // Delete user profile and their associated image
  public async deleteUserProfileData(id: string): Promise<void> {



    const queryRunner = this.usersRepository.manager.connection.createQueryRunner();
    let user;
    let photoId;
    // Start the transaction
    await queryRunner.startTransaction();

    try {
      user = await queryRunner.manager.findOne(User, {
        where: { id },
        relations: ['photo'],
      });

      if (!user) {
        throw new NotFoundException(`User with ID ${id} not found`);
      }

      // Delete the associated image from Cloudinary
      if (user.photo) {
        await this.photoService.deleteImageFromCloudinary('nestjs', user.photo.url);
        photoId = user.photo.id;
        // await queryRunner.manager.delete(Upload, {
        //   id:user.upload.id
        // });

      }

      user.firstName = null;
      user.lastName = null;
      user.photo = null;

      // Remove the user from the database
      await queryRunner.manager.save(User, user);
      await queryRunner.manager.delete(Photo, {
        id:photoId
      });

      // Commit the transaction
      await queryRunner.commitTransaction();
    } catch (error) {
      console.log(error);

      // Rollback the transaction if an error occurs
      await queryRunner.rollbackTransaction();
      throw new InternalServerErrorException('An error occurred while deleting the user profile data');
    } finally {
      // Release the query runner
      await queryRunner.release();
    }
  }
}
