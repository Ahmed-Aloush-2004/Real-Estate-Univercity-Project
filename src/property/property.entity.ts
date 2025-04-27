import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { PropertyType } from "./enums/property-type.enum";
import { Location } from '../location/location.entity'
import { PropertySellingType } from "./enums/property-selling-type.enum";
import { Office } from "src/office/office.entity";
import { Photo } from "src/photo/photo.entity";
import { PropertyOperationType } from "./enums/property-operation-type.enum";
import { Favorite } from "src/favorite/entities/favorite.entity";
import { Property_Comments } from "src/property_comments/entities/property_comment.entity";
import { License } from "src/license/entities/license.entity";
import { Property_Attributes } from "src/property_attributes/entities/property_attribute.entity";
import { Property_Problem } from "./property_problem.entity";
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

    //@@@@@@@@@@@@@@@@
    @OneToMany(() => Favorite, (favorite) => favorite.property)
    favoriteBy: Favorite[];

    //@@@@@@@@@@@@@@@@
    @OneToMany(() => Property_Comments, (property_comment) => property_comment.property)
    commentBy: Property_Comments[];


    //@@@@@@@@@@@@@@@@
    @ManyToMany(() => License, (license) => license.property)
    @JoinTable({
        name: "property_license"
    })
    license: License[];

    //@@@@@@@@@@@@@@@@
    @OneToMany(() => Property_Attributes, (property_attribute) => property_attribute.property)
    propertyAttribue: Property_Comments[];

    //@@@@@@@@@@@@@@@@
    @OneToMany(() => Property_Problem, (property_problem) => property_problem.property)
    propertyProblem: Property_Problem[];


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
