import { Module } from '@nestjs/common';
import { LocationService } from './location.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Location } from './location.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Location]),
  ],
  providers: [LocationService],
  exports: [LocationService,TypeOrmModule],

})
export class LocationModule {}
