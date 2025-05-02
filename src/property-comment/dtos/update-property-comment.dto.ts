import { IsNotEmpty, IsString, IsUUID } from "class-validator";




export class UpdatePropertyCommentDto {

    @IsNotEmpty()
    @IsString()
    content: string;
}