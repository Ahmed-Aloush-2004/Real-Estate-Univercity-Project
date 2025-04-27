import { Property_Attributes } from "src/property_attributes/entities/property_attribute.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Attribute {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    //@@@@@@@@@@@@@@@@
    @OneToMany(() => Property_Attributes, (property_attribute) => property_attribute.attribute)
    attributeToProperty: Property_Attributes[];
}
