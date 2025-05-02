import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreatePropertyTypeAttributeDto {
  @IsNotEmpty()
  @IsNumber()
  propertyTypeId: number;

  @IsNotEmpty()
  @IsNumber()
  attributeId: number;

  @IsString()
  value: string;
}
