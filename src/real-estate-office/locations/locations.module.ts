import { Module } from '@nestjs/common';
import { LocationsService } from './locations.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Location } from './location.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Location]),
  ],
  providers: [LocationsService],
  exports: [LocationsService,TypeOrmModule],

})
export class LocationsModule {}
