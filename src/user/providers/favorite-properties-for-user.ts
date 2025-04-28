import {
    Injectable,
    NotFoundException,
    BadRequestException,
    InternalServerErrorException,
  } from '@nestjs/common';
  import { InjectRepository } from '@nestjs/typeorm';
  import { Repository, DataSource } from 'typeorm';
  import { User } from '../entities/user.entity';
  import { Property } from 'src/property/entities/property.entity';
  
  @Injectable()
  export class FavoritePropertiesForUser {
    constructor(  
      private readonly dataSource: DataSource,
    ) {}
  
    public async getAllPropertiesInMyFavoriteList(userId: string): Promise<Property[]> {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
      
        try {
          const user = await queryRunner.manager.findOne(User, {
            where: { id: userId },
            relations: ['favoriteProperties'],
          });
      
          if (!user) {
            throw new NotFoundException(`User with ID ${userId} not found`);
          }
      
          return user.favoriteProperties;
        } catch (error) {
          throw new InternalServerErrorException('Failed to fetch favorite properties');
        } finally {
          await queryRunner.release();
        }
      }
      


    public async addPropertyToUserFavoriteList(userId: string, propertyId: string): Promise<void> {
      const queryRunner = this.dataSource.createQueryRunner();
      await queryRunner.connect();
      await queryRunner.startTransaction();
  
      try {
        const user = await queryRunner.manager.findOne(User, {
          where: { id: userId },
          relations: ['favoriteProperties'],
        });
  
        if (!user) {
          throw new NotFoundException(`User with ID ${userId} not found`);
        }
  
        const property = await queryRunner.manager.findOne(Property, {
          where: { id: propertyId },
        });
  
        if (!property) {
          throw new NotFoundException(`Property with ID ${propertyId} not found`);
        }
  
        const isAlreadyFavorite = user.favoriteProperties.some(p => p.id === propertyId);
        if (isAlreadyFavorite) {
          throw new BadRequestException('Property is already in favorites');
        }
  
        user.favoriteProperties.push(property);
        await queryRunner.manager.save(User, user);
  
        await queryRunner.commitTransaction();
      } catch (error) {
        await queryRunner.rollbackTransaction();
        throw new InternalServerErrorException('Failed to add property to favorites');
      } finally {
        await queryRunner.release();
      }
    }
  
    public async removePropertyFromUserFavoriteList(userId: string, propertyId: string): Promise<void> {
      const queryRunner = this.dataSource.createQueryRunner();
      await queryRunner.connect();
      await queryRunner.startTransaction();
  
      try {
        const user = await queryRunner.manager.findOne(User, {
          where: { id: userId },
          relations: ['favoriteProperties'],
        });
  
        if (!user) {
          throw new NotFoundException(`User with ID ${userId} not found`);
        }
  
        const propertyIndex = user.favoriteProperties.findIndex(p => p.id === propertyId);
  
        if (propertyIndex === -1) {
          throw new NotFoundException('Property not found in user favorites');
        }
  
        user.favoriteProperties.splice(propertyIndex, 1);
        await queryRunner.manager.save(User, user);
  
        await queryRunner.commitTransaction();
      } catch (error) {
        await queryRunner.rollbackTransaction();
        throw new InternalServerErrorException('Failed to remove property from favorites');
      } finally {
        await queryRunner.release();
      }
    }
  }
  