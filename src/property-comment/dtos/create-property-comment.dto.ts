import { IsNotEmpty, IsString, IsUUID, Length } from "class-validator";




export class CreatePropertyCommentDto {

    @IsNotEmpty()
    @IsString()
    @Length(15,50)
    content: string;


    @IsUUID()
    @IsNotEmpty()
    propertyId: string;
}