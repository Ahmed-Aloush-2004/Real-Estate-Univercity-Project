import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from '../user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UploadsService } from 'src/uploads/providers/uploads.service';
import { Upload } from 'src/uploads/upload.entity';
import { UpdateUserProfileDto } from '../dtos/update-user-profile.dto';
import { NotFoundException, InternalServerErrorException } from '@nestjs/common';

@Injectable()
export class UserProfileProvider {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,

    private readonly uploadService: UploadsService,
  ) { }

  static FolderName = 'nestjs'

  // Get user profile
  public async getUserProfile(id: string): Promise<User> {
    const user = await this.usersRepository.findOne({
      where: { id },
      relations: ['upload'], // Include the upload relation
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
        relations: ['upload'],
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
        const existingUpload = user.upload;

        if (existingUpload) {
          // Delete the old image from Cloudinary
          await this.uploadService.deleteImageFromCloudinary(UserProfileProvider.FolderName, user.upload.path);
          await queryRunner.manager.delete(Upload, {
            id: user.upload.id
          })
        }
        // Upload new image

        const uploadResponse = await this.uploadService.uploadImageToCloudinary(UserProfileProvider.FolderName, file);
        // Create a new upload entity
        // console.log(uploadResponse);

        const newUpload = new Upload();
        // newUpload.name = uploadResponse.public_id;
        newUpload.path = uploadResponse.secure_url;
        newUpload.type = 'IMAGE';
        // newUpload.mime = file.mimetype;
        newUpload.size = file.size;
        // newUpload.user = user;

        // Save the new upload entity
        const savedUpload = await queryRunner.manager.save(Upload, newUpload);


        // Assign the upload to the user
        user.upload = savedUpload;

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
    let uploadId;
    // Start the transaction
    await queryRunner.startTransaction();

    try {
      user = await queryRunner.manager.findOne(User, {
        where: { id },
        relations: ['upload'],
      });

      if (!user) {
        throw new NotFoundException(`User with ID ${id} not found`);
      }

      // Delete the associated image from Cloudinary
      if (user.upload) {
        await this.uploadService.deleteImageFromCloudinary('nestjs', user.upload.path);
        uploadId = user.upload.id;
        // await queryRunner.manager.delete(Upload, {
        //   id:user.upload.id
        // });

      }

      user.firstName = null;
      user.lastName = null;
      user.upload = null;

      // Remove the user from the database
      await queryRunner.manager.save(User, user);
      await queryRunner.manager.delete(Upload, {
        id:uploadId
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
