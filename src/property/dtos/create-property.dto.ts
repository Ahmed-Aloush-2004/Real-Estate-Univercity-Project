import { Type } from 'class-transformer';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
  IsArray,
  IsUUID,
  IsJSON,
} from 'class-validator';
import { PropertyType } from '../enums/property-type.enum';
import { PropertySellingType } from '../enums/property-selling-type.enum';
import { CreateLocationDto } from '../../real-estate-office/locations/dtos/create-location.dto';

export class CreatePropertyDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsEnum(PropertyType)
  property_type: PropertyType;

  @IsNotEmpty()
  @IsEnum(PropertySellingType)
  property_selling_type: PropertySellingType;

  @IsNotEmpty()
  @IsNumber()
  price: number;

  @IsOptional()
  @IsString()
  description?: string;

  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  area: number;

  // @IsNotEmpty()
  // @IsJSON()
  @ValidateNested()
  @Type(() => CreateLocationDto)
  location: CreateLocationDto;

  //   @IsOptional()
  //   @IsArray()
  //   @IsUUID('all', { each: true })
  //   photoIds?: string[]; // Assume you're sending Upload entity IDs for photos
}
