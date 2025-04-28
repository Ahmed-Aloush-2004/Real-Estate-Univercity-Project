import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PropertyComment } from './property-comment.entity';
import { PropertyCommentService } from './property-comment.service';
import { UserModule } from 'src/user/user.module';
import { PropertyModule } from 'src/property/property.module';
import { PropertyCommentController } from './property-comment.controller';

@Module({
    imports:[
        TypeOrmModule.forFeature([PropertyComment]),
        UserModule,
        forwardRef(()=> PropertyModule),

    ],
    providers: [PropertyCommentService],
    exports: [PropertyCommentService],
    controllers: [PropertyCommentController],

    
})
export class PropertyCommentModule {}
