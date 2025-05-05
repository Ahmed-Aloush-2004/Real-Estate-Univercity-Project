import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Office } from "src/office/entities/office.entity";
import { PropertyComment } from "src/property-comment/property-comment.entity";
import { PropertyProblem } from "src/property-problem/property-problem.entity";
import { PropertyPhoto } from "./property-photo.entity";
import { PropertyOperationType } from "../enums/property-operation-type.enum";
import { Location } from "src/location/location.entity";
import { PropertyLicense } from "src/property-license/entities/property-license.entity";
import { PropertyType } from "src/propertyType/entities/propertyType.entity";
import { PropertyAttribute } from "./property-attribute.entity";
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
        type: 'numeric',
        default: 0,
    })
    rating: number

    @OneToOne(() => Location,)
    @JoinColumn()
    location: Location;

    @OneToMany(() => PropertyComment, (propertyComment) => propertyComment.property)
    propertyComments: PropertyComment[];

    @OneToMany(() => PropertyProblem, (propertyProblem) => propertyProblem.property)
    PropertyProblems: PropertyProblem[];


    @OneToMany(()=> PropertyLicense ,(licenseProperty)=>licenseProperty.property)
    propertyLicense: PropertyLicense[];


    // 
    @ManyToOne(()=> PropertyType ,(propertyType)=>propertyType.properties)
    @JoinColumn()
    propertyType: PropertyType;

    @OneToMany(() => PropertyAttribute, (property_attribute) => property_attribute.property)
    propertyAttributes: PropertyAttribute[];

}

