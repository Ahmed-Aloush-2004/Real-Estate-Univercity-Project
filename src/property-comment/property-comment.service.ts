import { ForbiddenException, forwardRef, Inject, Injectable, InternalServerErrorException, NotFoundException, RequestTimeoutException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PropertyComment } from './property-comment.entity';
import { Repository } from 'typeorm';
import { CreatePropertyCommentDto } from './dtos/create-property-comment.dto';
import { User } from 'src/user/entities/user.entity';
import { Property } from 'src/property/entities/property.entity';
import { PropertyService } from 'src/property/providers/property.service';
import { UserService } from 'src/user/providers/users.service';
import { UpdatePropertyCommentDto } from './dtos/update-property-comment.dto';

@Injectable()
export class PropertyCommentService {
    constructor(
        @InjectRepository(PropertyComment)
        private readonly propertyCommentRepository: Repository<PropertyComment>,

        @Inject(forwardRef(() => PropertyService))
        private readonly propertyService: PropertyService,

        // @Inject(forwardRef(() => UserService))
        private readonly userService: UserService,


    ) { }


    public async getAllCommentsForThisProperty(propertyId: string) {
        return await this.propertyCommentRepository.find({
            where: {
                property: {
                    id: propertyId,
                }
            }
        })
    }


    public async createCommentForProperty(userId: string, createPropertyCommentDto: CreatePropertyCommentDto) {

        try {
            let user = await this.userService.findUserByField('id', userId);
            let property = await this.propertyService.getPropertyById(createPropertyCommentDto.propertyId);
            let comment = this.propertyCommentRepository.create({
                content: createPropertyCommentDto.content,
                user,
                property,
            })
            return await this.propertyCommentRepository.save(comment);
        } catch (error) {
            throw new InternalServerErrorException('Failed to create a comment')
        }

    }

    public async updateComment(userId: string, commentId: string, updatePropertyCommentDto: UpdatePropertyCommentDto) {
        try {

            let user = await this.userService.findUserByField('id', userId);


            let comment = await this.propertyCommentRepository.findOne({
                where: {
                    id: commentId,
                }
            })

            if (!comment) {
                throw new NotFoundException(`Comment with this id:${commentId} doesn't exist.`)
            }

            if (comment.user.id !== user.id) {
                throw new ForbiddenException()
            }

            comment.content = updatePropertyCommentDto.content;

            return await this.propertyCommentRepository.save(comment);

        } catch (error) {
            if (error instanceof NotFoundException) throw error
            throw new InternalServerErrorException('Failed to update a comment')
        }
    }


    public async deleteComment(userId: string, commentId: string) {
        try {
            let user = await this.userService.findUserByField('id', userId);

            let comment = await this.propertyCommentRepository.findOne({
                where: {
                    id: commentId,
                }
            })
            if (!comment) {
                throw new NotFoundException(`Comment with this id:${commentId} doesn't exist.`)
            }

            if (comment.user.id !== user.id) {
                throw new ForbiddenException()
            }

         await this.propertyCommentRepository.delete({
                id: commentId
            });

        } catch (error) {
            
            throw new InternalServerErrorException('Failed to update a comment')
        }
    }


}
