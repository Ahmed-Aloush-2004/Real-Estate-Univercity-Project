import { PartialType } from '@nestjs/swagger';
import { CreatePropertyAttributeDto } from './create-property-attribute.dto';

export class UpdatePropertyAttributeDto extends PartialType(CreatePropertyAttributeDto) {}
