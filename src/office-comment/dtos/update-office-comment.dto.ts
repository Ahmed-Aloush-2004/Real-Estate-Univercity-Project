import { IsNotEmpty, IsString } from "class-validator";




export class UpdateOfficeCommentDto {

    @IsNotEmpty()
    @IsString()
    content: string;
}