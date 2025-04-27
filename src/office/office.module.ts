import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Office } from './entities/office.entity';
import { OfficeService } from './office.service';
import { CreateOfficeProvider } from './providers/create-office.provider';
import { UpdateOfficeProvider } from './providers/update-office.provider';
import { DeleteOfficeProvider } from './providers/delete-office.provider';
import { UserModule } from 'src/user/user.module';
import { RealEstateOfficeController } from './real-estate-office.controller';
import { AuthModule } from 'src/auth/auth.module';
import { PhotoModule } from 'src/photo/photo.module';
import { Office_Rating } from './entities/office_rating.entity';
import { Office_Comments } from './entities/office_comments.entity';

@Module({
    imports:[
        TypeOrmModule.forFeature([Office , Office_Rating, Office_Comments]),
        UserModule,
        PhotoModule,
        AuthModule,
    ],
    providers:[OfficeService, CreateOfficeProvider, UpdateOfficeProvider, DeleteOfficeProvider],
    exports:[],
    controllers:[RealEstateOfficeController],
})
export class OfficeModule {} 
