import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Property } from './property.entity';
import { PropertyService } from './providers/property.service';
import { CreatePropertyProvider } from './providers/create-property.provider';
import { UpdatePropertyProvider } from './providers/update-property.provider';
import { DeletePropertyProvider } from './providers/delete-property.provider';
import { PropertyController } from './property.controller';
import { GetPropertyByIdProvider } from './providers/get-property-by-id.provider';
import { GetPropertiesWithFilterAndPaginationProvider } from './providers/get-properties-with-filter-and-pagination.provider';
import { PhotoModule } from 'src/photo/photo.module';
import { LocationModule } from 'src/location/location.module';
import { PropertyCommentModule } from 'src/property-comment/property-comment.module';
import { PropertyProblemModule } from 'src/property-problem/property-problem.module';

@Module({
    imports:[
        TypeOrmModule.forFeature([Property]),
        LocationModule,
        PhotoModule,
        forwardRef(()=> PropertyCommentModule),
        forwardRef(()=> PropertyProblemModule),
    ],
    providers: [PropertyService, CreatePropertyProvider, UpdatePropertyProvider, DeletePropertyProvider, GetPropertyByIdProvider, GetPropertiesWithFilterAndPaginationProvider],
    controllers: [PropertyController],
    exports:[PropertyService],
})
export class PropertyModule {}
