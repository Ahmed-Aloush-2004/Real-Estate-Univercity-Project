import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Office } from './entities/office.entity';
import { OfficeService } from './office.service';
import { CreateOfficeProvider } from './providers/create-office.provider';
import { UpdateOfficeProvider } from './providers/update-office.provider';
import { DeleteOfficeProvider } from './providers/delete-office.provider';
import { UserModule } from 'src/user/user.module';
import { OfficeController } from './office.controller';
import { AuthModule } from 'src/auth/auth.module';
import { PhotoModule } from 'src/photo/photo.module';
import { OfficeCommentModule } from 'src/office-comment/office-comment.module';
import { PropertyModule } from 'src/property/property.module';
import { LicensePhoto } from './entities/license-photo.entity';

@Module({
    imports:[
        TypeOrmModule.forFeature([Office,LicensePhoto]),
        UserModule,
        PhotoModule,
        AuthModule,
        PropertyModule,
        forwardRef(()=> OfficeCommentModule),
        
    ],
    providers:[OfficeService, CreateOfficeProvider, UpdateOfficeProvider, DeleteOfficeProvider],
    exports:[OfficeService],
    controllers:[OfficeController],
})
export class OfficeModule {} 
