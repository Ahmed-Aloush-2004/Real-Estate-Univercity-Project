import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OfficeComment } from './office-comment.entity';
import { OfficeCommentService } from './office-comment.service';
import { UserModule } from '../user/user.module';
import { OfficeCommentController } from './office-comment.controller';
import { OfficeModule } from 'src/office/office.module';

@Module({
    imports:[
        TypeOrmModule.forFeature([OfficeComment]),
        forwardRef(()=> OfficeModule),
        UserModule,

    ],
    providers: [OfficeCommentService],
    exports: [OfficeCommentService],
    controllers: [OfficeCommentController],

    
})
export class OfficeCommentModule {}
