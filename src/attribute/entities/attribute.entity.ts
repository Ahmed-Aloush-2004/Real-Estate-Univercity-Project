import { PropertyAttribute } from "src/property-attribute/entities/property-attribute.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Attribute {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    // //@@@@@@@@@@@@@@@@
    // @OneToMany(() => PropertyAttribute, (property_attribute) => property_attribute.attribute)
    // attributesToProperty: PropertyAttribute[];
}
