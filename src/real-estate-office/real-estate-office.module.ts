import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RealEstateOffice } from './real-estate-office.entity';
import { RealEstateOfficeService } from './real-estate-office.service';
import { CreateRealEstateOfficeProvider } from './providers/create-real-estate-office.provider';
import { UpdateRealEstateOfficeProvider } from './providers/update-real-estate-office.provider';
import { DeleteRealEstateOfficeProvider } from './providers/delete-real-estate-office.provider';
import { UploadsModule } from 'src/uploads/uploads.module';
import { UsersModule } from 'src/users/users.module';
import { RealEstateOfficeController } from './real-estate-office.controller';

@Module({
    imports:[
        TypeOrmModule.forFeature([RealEstateOffice]),
        UploadsModule,
        UsersModule,
    ],
    providers:[RealEstateOfficeService, CreateRealEstateOfficeProvider, UpdateRealEstateOfficeProvider, DeleteRealEstateOfficeProvider],
    exports:[],
    controllers:[RealEstateOfficeController],
})
export class RealEstateOfficeModule {} 
