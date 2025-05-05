import { PartialType } from '@nestjs/mapped-types';
import { CreatePropertyTypeDto } from './create-propertyType.dto';

export class UpdatePropertyTypeDto extends PartialType(CreatePropertyTypeDto) {}
