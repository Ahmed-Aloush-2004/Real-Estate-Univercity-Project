import { Property } from "src/property/property.entity";
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

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

    @ManyToMany(() => Property, (property) => property.license)
    property: Property[];
}
