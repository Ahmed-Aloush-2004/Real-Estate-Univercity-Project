import { ForbiddenException, forwardRef, Inject, Injectable, InternalServerErrorException, NotFoundException, RequestTimeoutException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OfficeComment } from './office-comment.entity';
import { Repository } from 'typeorm';
import { CreateOfficeCommentDto } from './dtos/create-office-comment.dto';
import { UserService } from 'src/user/providers/users.service';
import { UpdateOfficeCommentDto } from './dtos/update-office-comment.dto';
import { OfficeService } from '../office/office.service';

@Injectable()
export class OfficeCommentService {
    constructor(
        @InjectRepository(OfficeComment)
        private readonly officeCommentRepository: Repository<OfficeComment>,
        
        //  @Inject(forwardRef(() => UserService))
          private readonly userService: UserService,
      
        @Inject(forwardRef(()=> OfficeService))
        private readonly officeService: OfficeService,



    ) { }


    public async getAllCommentsForThisOffice(officeId: string) {
        return await this.officeCommentRepository.find({
            where: {
                office: {
                    id: officeId,
                }
            }
        })
    }


    public async createCommentForOffice(userId: string, createOfficeCommentDto: CreateOfficeCommentDto) {

        try {
            let user = await this.userService.findUserByField('id', userId);
            let office = await this.officeService.getOfficeById(createOfficeCommentDto.officeId);
            let comment = this.officeCommentRepository.create({
                content: createOfficeCommentDto.content,
                user,
                office,
            })
            return await this.officeCommentRepository.save(comment);
        } catch (error) {
            throw new InternalServerErrorException('Failed to create a comment')
        }

    }

    public async updateComment(userId: string, commentId: string, updateOfficeCommentDto: UpdateOfficeCommentDto) {
        try {

            let user = await this.userService.findUserByField('id', userId);
            let comment = await this.officeCommentRepository.findOne({
                where: {
                    id: commentId,
                    // user:{
                    //     id:userId
                    // }
                }
            })
            if (!comment) {
                throw new NotFoundException(`Comment with this id:${commentId} doesn't exist.`)
            }

            if (comment.user.id !== user.id) {
                throw new ForbiddenException()
            }

            comment.content = updateOfficeCommentDto.content;

            return await this.officeCommentRepository.save(comment);

        } catch (error) {
            if (error instanceof NotFoundException) throw error
            throw new InternalServerErrorException('Failed to update a comment')
        }
    }


    public async deleteComment(userId: string, commentId: string) {
        try {
            let user = await this.userService.findUserByField('id', userId);

            let comment = await this.officeCommentRepository.findOne({
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

            return await this.officeCommentRepository.delete({
                id: commentId
            });

        } catch (error) {
            throw new InternalServerErrorException('Failed to update a comment')
        }
    }


}
