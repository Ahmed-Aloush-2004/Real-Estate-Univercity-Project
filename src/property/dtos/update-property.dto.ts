import { PartialType } from "@nestjs/swagger";
import { CreatePropertyDto } from "./create-property.dto";
import { IsArray, IsOptional, IsUUID, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { UpdateLocationDto } from "src/real-estate-office/locations/dtos/update-location.dto";








export class UpdatePropertyDto extends PartialType(CreatePropertyDto){
    // @IsOptional()
    // @ValidateNested()
    // @Type(() => UpdateLocationDto)
    // location?: UpdateLocationDto;
  
    // @IsOptional()
    // @IsArray()
    // @IsUUID('all', { each: true })
    // photoIds?: string[];
}