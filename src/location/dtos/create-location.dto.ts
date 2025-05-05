// src/location/dto/createLocation.dto.ts

import { IsOptional, IsString, IsNumber, IsNotEmpty } from 'class-validator';

export class CreateLocationDto {

    
    @IsNotEmpty()
    @IsString()
    street: string;

    @IsString()
    @IsNotEmpty()
    neighborhood: string;

    @IsString()
    @IsNotEmpty()
    city: string;

    @IsString()
    @IsNotEmpty()
    governorate: string;

    @IsOptional()
    @IsString()
    postalCode?: string;

    @IsOptional()
    @IsString()
    buildingNumber?: string;

    @IsOptional()
    @IsString()
    apartmentNumber?: string;

    @IsOptional()
    @IsNumber()
    latitude?: number;

    @IsOptional()
    @IsNumber()
    longitude?: number;
}