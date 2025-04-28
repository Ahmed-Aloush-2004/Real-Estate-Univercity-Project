import { PartialType } from '@nestjs/swagger';
import { CreatePropertyAttributeDto } from './create-property_attribute.dto';

export class UpdatePropertyAttributeDto extends PartialType(CreatePropertyAttributeDto) {}
