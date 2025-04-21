import { PartialType } from "@nestjs/swagger";
import { CreateRealEstateOfficeDto } from "./create-real-estate-office.dto";



export class UpdateRealEstateOfficeDto extends PartialType(CreateRealEstateOfficeDto) { }