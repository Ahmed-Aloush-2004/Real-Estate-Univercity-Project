import { Module } from '@nestjs/common';
import { PropertyLicenseService } from './property-license.service';
import { PropertyLicenseController } from './property-license.controller';

@Module({
  controllers: [PropertyLicenseController],
  providers: [PropertyLicenseService],
})
export class PropertyLicenseModule {}
