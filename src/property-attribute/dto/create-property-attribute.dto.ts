import { IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreatePropertyAttributeDto {
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  propertyId: string;

  @IsNotEmpty()
  @IsString()
  @IsUUID()
  attributeId: string;

  @IsString()
  number: string;
}
