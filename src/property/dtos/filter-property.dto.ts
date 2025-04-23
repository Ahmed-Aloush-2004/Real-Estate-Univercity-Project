import { IsEnum, IsNumber, IsOptional, IsString, Min } from 'class-validator';
import { PropertyType } from '../enums/property-type.enum';
import { PropertySellingType } from '../enums/property-selling-type.enum';
import { Type } from 'class-transformer';

export class FilterPropertyDto {
  @IsOptional()
  @IsEnum(PropertyType)
  property_type?: PropertyType;

  @IsOptional()
  @IsEnum(PropertySellingType)
  property_selling_type?: PropertySellingType;

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
  minArea?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  maxArea?: number;

//   @IsOptional()
//   @IsString()
//   realEstateOfficeId?: string;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  page?: number = 1;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  limit?: number = 10;
}
