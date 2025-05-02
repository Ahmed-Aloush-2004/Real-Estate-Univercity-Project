import { PropertyTypeAttribute } from "src/propertyType-attribute/entities/propertyType-attribute.entity";
import { Property } from "src/property/entities/property.entity";
import { Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

//@Entity({name:'protpertyType'})
@Entity()
export class PropertyTypee {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    //@@@@@@@@@@@@@@@@
    @OneToMany(() => PropertyTypeAttribute, (propertyType) => propertyType.propertyType)
    propertyTypies: PropertyTypeAttribute[];

    //@@@@@@@@@@@@@@@@@@@@@@@@
    @OneToMany(() => Property , (property) => property.propertyType)
    properties: Property[];
}
