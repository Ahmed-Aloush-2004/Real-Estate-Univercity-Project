import { IsEnum, IsNotEmpty, IsString, IsUUID } from "class-validator";
import { PropertyProblemType } from "../enums/property-problem.enum";







export class CreatePropertyProblemDto {

    @IsNotEmpty()
    @IsEnum(PropertyProblemType)
    name:PropertyProblemType;

    @IsUUID()
    @IsNotEmpty()
    // @IsString()
    propertyId:string;   
}