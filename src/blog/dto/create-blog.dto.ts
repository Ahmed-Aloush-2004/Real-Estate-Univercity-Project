import {IsString , IsNumber , IsNotEmpty , IsPositive, MinLength , MaxLength , Min, Length, IsOptional, IsUUID, IsArray, Max} from 'class-validator';

export class CreateBlogDto{

    @IsString({message: 'title should be string'})
    @IsNotEmpty()
    // @MinLength(5)
    // @MaxLength(30)
    title: string;

    @IsString()
    @MinLength(5)
    @IsOptional()
    intro?: string;

    @IsString()
    @IsNotEmpty()
    @Length(50)
    content: string;

    


}