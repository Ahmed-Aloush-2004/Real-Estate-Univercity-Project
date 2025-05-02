import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePropertyTypeDto {
  @IsNotEmpty()
  @IsString()
  name: string;
}
