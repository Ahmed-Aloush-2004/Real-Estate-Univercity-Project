import { PropertyLicense } from "src/property-license/entities/property-license.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class License {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    licenseNumber: number;

    @Column()
    date: string;

    @Column()
    space: string;

    @Column()
    floors: string;

    @OneToMany(() => PropertyLicense, (propertyLicense) => propertyLicense.license)
    LicenseOnProperty: PropertyLicense[];
}
