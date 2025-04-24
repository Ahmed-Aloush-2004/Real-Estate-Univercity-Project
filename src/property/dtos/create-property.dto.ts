// src/property/dto/create-property.dto.ts

import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
  IsUUID,
  ArrayMinSize,
} from 'class-validator';
import { Type } from 'class-transformer';
import { PropertyType } from '../enums/property-type.enum';
import { PropertySellingType } from '../enums/property-selling-type.enum';
import { PropertyOperationType } from '../enums/property-operation-type.enum';
import { CreateLocationDto } from 'src/location/dtos/create-location.dto';

export class CreatePropertyDto {
  @IsNotEmpty()
  @IsNumber()
  propertyNumber: number;

  @IsNotEmpty()
  @IsEnum(PropertyOperationType)
  operation: PropertyOperationType;

  @IsNotEmpty()
  @IsNumber()
  space: number;

  @IsNotEmpty()
  @IsNumber()
  price: number;

  @IsOptional()
  @IsString()
  description?: string;

  @IsNotEmpty()
  @IsEnum(PropertyType)
  type: PropertyType;

  @IsOptional()
  @IsNumber()
  rating?: number;

  // @IsNotEmpty()
  // @IsUUID()
  // officeId: string;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => CreateLocationDto)
  location: CreateLocationDto;

  // This assumes you're uploading photo URLs or IDs. Adjust accordingly if you upload files differently.
  // @IsOptional()
  // @IsString({ each: true })
  // @ArrayMinSize(1)
  // photoUrls?: string[];
}
