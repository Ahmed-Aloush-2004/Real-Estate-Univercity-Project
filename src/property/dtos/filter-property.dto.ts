import { IsEnum, IsNumber, IsOptional, Min } from 'class-validator';
import { PropertyTypeEnum } from '../enums/property-type.enum';
import { PropertyOperationType } from '../enums/property-operation-type.enum';
import { Type } from 'class-transformer';

export class FilterPropertyDto {
  @IsOptional()
  @IsEnum(PropertyTypeEnum)
  type?: PropertyTypeEnum;

  @IsOptional()
  @IsEnum(PropertyOperationType)
  operation?: PropertyOperationType;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  minPrice?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  maxPrice?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  minSpace?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  maxSpace?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  page: number = 1;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  limit: number = 10;
}
