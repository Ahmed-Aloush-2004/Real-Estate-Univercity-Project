// src/property/dto/create-property.dto.ts

import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
  IsArray,
  IsUUID
} from 'class-validator';
import { Type } from 'class-transformer';
import { PropertyOperationType } from '../enums/property-operation-type.enum';
import { CreateLocationDto } from 'src/location/dtos/create-location.dto';
import { PropertyProblemType } from 'src/property-problem/enums/property-problem.enum';
import { CreateAttributeDto } from 'src/attribute/dto/create-attribute.dto';

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
  @IsUUID()
  type: string;

  @IsOptional()
  @IsNumber()
  rating?: number;


  @IsOptional()
  @IsArray()
  @IsEnum(PropertyProblemType, { each: true })
  problems?: PropertyProblemType[];
  
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => CreateLocationDto)
  location: CreateLocationDto;

  @IsNotEmpty()
  @Type(() => CreateAttributeDto)
  @IsArray()
  attributes: CreateAttributeDto[];
}
