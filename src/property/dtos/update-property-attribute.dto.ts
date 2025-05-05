import { PartialType } from '@nestjs/swagger';
import { CreatePropertyAttributeDto } from '../../property/dtos/create-property-attribute.dto';

export class UpdatePropertyAttributeDto extends PartialType(CreatePropertyAttributeDto) {}
