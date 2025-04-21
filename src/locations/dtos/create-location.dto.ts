import { IsNotEmpty, IsNotIn, IsOptional, IsString } from 'class-validator';

export class CreateLocationDto {
    
    @IsNotEmpty()
    @IsString()
    city: string;

    @IsNotEmpty()
    @IsString()
    street: string;

    @IsOptional()
    @IsString()
    zipCode?: string;
}
