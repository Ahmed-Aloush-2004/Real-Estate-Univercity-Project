import { LicenseManager } from "aws-sdk";
import { License } from "src/license/entities/license.entity";
import { Property } from "src/property/entities/property.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class PropertyLicense {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Property , (property) => property.propertyLicense)
    property: Property;

    @ManyToOne(() => License , (license) => license.LicenseOnProperty)
    license: License;

    @Column()
    date: Date;
}
