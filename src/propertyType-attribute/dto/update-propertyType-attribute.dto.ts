import { PartialType } from '@nestjs/swagger';
import { CreatePropertyTypeAttributeDto } from './create-propertyType-attribute.dto';

export class UpdatePropertyTypeAttributeDto extends PartialType(CreatePropertyTypeAttributeDto) {}
