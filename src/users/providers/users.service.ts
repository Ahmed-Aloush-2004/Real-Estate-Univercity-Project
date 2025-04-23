import { BadRequestException, forwardRef, Inject, Injectable, NotFoundException, RequestTimeoutException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user.entity';
import { Repository } from 'typeorm';
import { AuthService } from 'src/auth/providers/auth.service';
import { HashingProvider } from 'src/auth/providers/hashing.provider';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UserProfileProvider } from './user-profile.provider';
import { UpdateUserProfileDto } from '../dtos/update-user-profile.dto';
import { UserRole } from '../enums/user-role.enum';

@Injectable()
export class UsersService {

    constructor(

        @InjectRepository(User)
        private readonly usersRepository: Repository<User>,

        @Inject(forwardRef(() => HashingProvider))
        private readonly hashingProvider: HashingProvider,

        private readonly userProfileProvider: UserProfileProvider,

    ) { }


    private async findUserByField(field: string, value: string): Promise<User> {
        try {
            const user = await this.usersRepository.findOne({ where: { [field]: value } });
            if (!user) throw new NotFoundException(`User not found with ${field}: ${value}`);
            return user;
        } catch (error) {
            throw new RequestTimeoutException('Error connecting to the DB', error);
        }
    }



    public async findOneUserById(id: string) {
        let user = undefined;
        try {

            user = await this.usersRepository.findOneBy({
                id
            });

            if (!user) {
                throw new NotFoundException(
                    'There aren\'t user for this id'
                )
            }

            return user;

        } catch (error) {
            throw new RequestTimeoutException(error, {
                description: 'Something happen when we were connecting with the DB'
            })
        }
    }

    public async findOneUserByEmail(email: string) {
        let user = undefined;
        try {

            user = await this.usersRepository.findOneBy({
                email
            });

            if (!user) {
                throw new NotFoundException(
                    'There aren\'t user for this email'
                )
            }

            return user;

        } catch (error) {
            throw new RequestTimeoutException(error, {
                description: 'Something happen when we were connecting with the DB'
            })
        }
    }

    public async changeRoleForHavingARealEstateOffice(
        userId: string
    ) {
        try {

            let user = await this.usersRepository.findOne({
                where: {
                    id: userId
                }
            });

            if (!user) {
                throw new NotFoundException(`user with this id:${userId}. it doesn't exist.`)
            }

            user.role = UserRole.Admin;

            return await this.usersRepository.save(user);

        } catch (error) {
            if(error === NotFoundException) throw error;
            
            throw new RequestTimeoutException(error, {
                description: 'Something happen when we were connecting with the DB'
            })
        }

    }

    public async createUser(createUserDto: CreateUserDto) {

        let user = undefined;

        try {

            user = await this.usersRepository.findOne({
                where: {
                    email: createUserDto.email,
                    phoneNumber: createUserDto.phoneNumber
                }
            })

        } catch (error) {
            throw new RequestTimeoutException('Unable to process your request at the moment please try later.', {
                description: 'Error Connecting to the database'
            })
        }

        if (user) {
            throw new BadRequestException('The user with this email or phone number is already exist please choose another data. ')
        }

        user = this.usersRepository.create({
            email: createUserDto.email,
            password: await this.hashingProvider.hashPassword(createUserDto.password),
            phoneNumber: createUserDto.phoneNumber
        });

        try {
            user = await this.usersRepository.save(user);

        } catch (error) {
            throw new RequestTimeoutException(error, {
                description: 'Something happen when we were connecting with the DB'
            })
        }

        return user;

    }

    public async updateUserProfile(
        id: string,
        updateData: UpdateUserProfileDto,
        file?: Express.Multer.File,
    ): Promise<User> {
        return await this.userProfileProvider.updateUserProfile(id, updateData, file);
    }


    public async getUserProfile(id: string): Promise<User> {
        return await this.userProfileProvider.getUserProfile(id);
    }


    public async deleteUserProfileData(id: string): Promise<void> {
        return await this.userProfileProvider.deleteUserProfileData(id);
    }







}
