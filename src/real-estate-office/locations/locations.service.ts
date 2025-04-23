import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Location } from './location.entity';
import { Repository } from 'typeorm';

@Injectable()
export class LocationsService {
    constructor(
        @InjectRepository(Location)
        private readonly locationsRepository:Repository<Location>,
    ){}
}
