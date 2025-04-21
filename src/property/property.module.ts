import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Property } from './property.entity';
import { PropertyService } from './providers/property.service';
import { CreatePropertyProvider } from './providers/create-property.provider';
import { UpdatePropertyProvider } from './providers/update-property.provider';
import { DeletePropertyProvider } from './providers/delete-property.provider';
import { PropertyController } from './property.controller';
import { LocationsModule } from 'src/locations/locations.module';
import { UploadsModule } from 'src/uploads/uploads.module';

@Module({
    imports:[
        TypeOrmModule.forFeature([Property]),
        LocationsModule,
        UploadsModule,
    ],
    providers: [PropertyService, CreatePropertyProvider, UpdatePropertyProvider, DeletePropertyProvider],
    controllers: [PropertyController],
    exports:[PropertyService],
})
export class PropertyModule {}
