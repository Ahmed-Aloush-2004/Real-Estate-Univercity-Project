import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";



@Entity()
export class Location {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    governorate: string;

    @Column()
    province: string;

    @Column()
    city: string;

    @Column()
    street: string;

    @Column({ nullable: true })
    zipCode?: string;

    // // Relationships
    // @OneToMany(() => Property, property => property.location)
    // properties: Property[];

}