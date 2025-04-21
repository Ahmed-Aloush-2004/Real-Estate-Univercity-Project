import { IsNotEmpty, IsOptional, IsString } from "class-validator";



export class CreateRealEstateOfficeDto {


    @IsString()
    @IsNotEmpty()
    name: string


    @IsString()
    @IsOptional()
    description?: string;


}