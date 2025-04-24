import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { PropertyType } from "./enums/property-type.enum";
import { Location } from '../location/location.entity'
import { PropertySellingType } from "./enums/property-selling-type.enum";
import { Office } from "src/office/office.entity";
import { Photo } from "src/photo/photo.entity";
import { PropertyOperationType } from "./enums/property-operation-type.enum";
@Entity()
export class Property {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        type: 'numeric'
    })
    propertyNumber: number;

    @Column({
        type: 'enum',
        enum: PropertyOperationType,
        default: PropertyOperationType.SELL
    })
    operation: PropertyOperationType;


    @Column({
        type: 'numeric',
    })
    space: number;


    @Column({
        type: 'numeric',
    })
    price: number;


    @OneToMany(() => Photo, (photo) => photo.property)
    photos: Photo[];



    @Column({
        type: 'varchar',
        length: 1024,
        nullable: true
    })
    description?: string;

    @ManyToOne(() => Office, (office) => office.properties)
    @JoinColumn()
    office: Office


    @Column({
        type: 'enum',
        enum: PropertyType,
    })
    type: PropertyType;


    @Column({
        type: 'numeric',
        default: 0,
    })
    rating: number

    @OneToOne(() => Location,)
    @JoinColumn()
    location: Location;

}










// @ManyToOne(() => Office, (office) => office.properties, { onDelete: 'SET NULL' })
// realEstateOffice: Office;  



// @OneToOne(() => Location)
// @JoinColumn()
// location: Location;

// @OneToMany(() => Upload, (upload) => upload.property,)
// photos: Upload[];

// @ManyToOne(() => RealEstateOffice, (realEstateOffice) => realEstateOffice.properties,)
// realEstateOffice: RealEstateOffice;




// @Column()
// title: string;

// @Column({
//     type: 'enum',
//     enum: PropertyType,
//     nullable: false,
// })
// property_type: PropertyType;


// @Column({
//     type: 'enum',
//     enum: PropertySellingType,
//     nullable: false,
// })
// property_selling_type: PropertySellingType;



// @Column('decimal', {
//     nullable: false
// })
// price: number;

// @Column({ nullable: true })
// description?: string;

// @Column('float', {
//     nullable: false
// })
// area: number; 
