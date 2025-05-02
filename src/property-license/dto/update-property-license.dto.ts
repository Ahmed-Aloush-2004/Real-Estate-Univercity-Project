import { PartialType } from '@nestjs/swagger';
import { CreatePropertyLicenseDto } from './create-property-license.dto';

export class UpdatePropertyLicenseDto extends PartialType(CreatePropertyLicenseDto) {}
