import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Office } from "src/office/entities/office.entity";
import { PropertyComment } from "src/property-comment/property-comment.entity";
import { PropertyProblem } from "src/property-problem/property-problem.entity";
import { PropertyPhoto } from "./property-photo.entity";
import { PropertyOperationType } from "../enums/property-operation-type.enum";
import { Location } from "src/location/location.entity";
import { PropertyTypee } from "src/propertyType/entities/propertyType.entity";
import { PropertyLicense } from "src/property-license/entities/property-license.entity";
import { PropertyType } from "../enums/property-type.enum";
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


    // @OneToMany(() => Photo, (photo) => photo.property)
    // photos: Photo[];

    @OneToMany(() => PropertyPhoto, (propertyPhoto) => propertyPhoto.property)
    propertyPhotos:PropertyPhoto[];



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

    @ManyToOne(()=> PropertyTypee ,(propertyType)=>propertyType.properties)
    propertyType: PropertyTypee;

    @OneToMany(() => PropertyComment, (propertyComment) => propertyComment.property)
    propertyComments: PropertyComment[];

    @OneToMany(() => PropertyProblem, (propertyProblem) => propertyProblem.property)
    PropertyProblems: PropertyProblem[];


    @OneToMany(()=> PropertyLicense ,(licenseProperty)=>licenseProperty.property)
    propertyLicense: PropertyLicense[];

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
