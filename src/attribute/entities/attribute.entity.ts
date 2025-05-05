import { PropertyAttribute } from "src/property/entities/property-attribute.entity";
import { PropertyType } from "src/propertyType/entities/propertyType.entity";
import { Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Attribute {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

     //@@@@@@@@@@@@@@@@
    @OneToMany(() => PropertyAttribute, (property_attribute) => property_attribute.attribute)
    attributesToProperty: PropertyAttribute[];

    @ManyToMany(() => PropertyType, (propertyType) => propertyType.attributes ) // optional eager
    attributesToPropertyType: PropertyType[]; // ✅ array, not singular
}
