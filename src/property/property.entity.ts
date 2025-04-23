import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { PropertyType } from "./enums/property-type.enum";
import { Location } from '../locations/location.entity'
import { PropertySellingType } from "./enums/property-selling-type.enum";
import { Office } from "src/office/office.entity";
import { Photo } from "src/photo/photo.entity";
@Entity()
export class Property {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    title: string;

    @Column({
        type: 'enum',
        enum: PropertyType,
        nullable: false,
    })
    property_type: PropertyType;


    @Column({
        type: 'enum',
        enum: PropertySellingType,
        nullable: false,
    })
    property_selling_type: PropertySellingType;



    @Column('decimal', {
        nullable: false
    })
    price: number;

    @Column({ nullable: true })
    description?: string;

    @Column('float', {
        nullable: false
    })
    area: number; // square meters or any unit


    @OneToOne(() => Location, { cascade: true })
    @JoinColumn()
    location: Location;

    @OneToMany(() => Upload, (upload) => upload.property, { cascade: true })
    photos: Photo[];

    @ManyToOne(() => Office, (office) => office.properties, { onDelete: 'SET NULL' })
    realEstateOffice: Office;  

 

    // @OneToOne(() => Location)
    // @JoinColumn()
    // location: Location;

    // @OneToMany(() => Upload, (upload) => upload.property,)
    // photos: Upload[];

    // @ManyToOne(() => RealEstateOffice, (realEstateOffice) => realEstateOffice.properties,)
    // realEstateOffice: RealEstateOffice;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
