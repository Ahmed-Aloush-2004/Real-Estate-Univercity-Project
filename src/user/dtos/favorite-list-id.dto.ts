import { IsNotEmpty, IsString, IsUUID } from "class-validator";




export class FavoriteListIdDto {

    @IsNotEmpty()
    @IsUUID()
    @IsString()
    propertyId: string;
}