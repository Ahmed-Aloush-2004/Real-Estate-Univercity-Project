import { Injectable } from '@nestjs/common';
import { CreatePropertyLicenseDto } from './dto/create-property-license.dto';
import { UpdatePropertyLicenseDto } from './dto/update-property-license.dto';

@Injectable()
export class PropertyLicenseService {
  create(createPropertyLicenseDto: CreatePropertyLicenseDto) {
    return 'This action adds a new propertyLicense';
  }

  findAll() {
    return `This action returns all propertyLicense`;
  }

  findOne(id: number) {
    return `This action returns a #${id} propertyLicense`;
  }

  update(id: number, updatePropertyLicenseDto: UpdatePropertyLicenseDto) {
    return `This action updates a #${id} propertyLicense`;
  }

  remove(id: number) {
    return `This action removes a #${id} propertyLicense`;
  }
}
