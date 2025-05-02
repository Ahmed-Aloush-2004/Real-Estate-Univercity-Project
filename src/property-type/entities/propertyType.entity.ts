import { PropertyAttribute } from "src/property-attribute/entities/property-attribute.entity";
import { Property } from "src/property/entities/property.entity";
import { Column, Entity, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

//@Entity({name:'protpertyType'})
@Entity()
export class PropertyType {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    //@@@@@@@@@@@@@@@@@@@@@@@@
    @ManyToOne(() => Property , (property) => property.type)
    properties: Property[];
}
