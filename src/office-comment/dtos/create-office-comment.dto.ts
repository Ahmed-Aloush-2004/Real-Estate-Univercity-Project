import { IsNotEmpty, IsString, IsUUID, Length } from "class-validator";




export class CreateOfficeCommentDto {

    @IsNotEmpty()
    @IsString()
    @Length(15,50)
    content: string;


    @IsUUID()
    @IsNotEmpty()
    officeId: string;
}