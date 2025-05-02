import { PropertyTypeAttribute } from "src/propertyType-attribute/entities/propertyType-attribute.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Attribute {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    //@@@@@@@@@@@@@@@@
    @OneToMany(() => PropertyTypeAttribute, (propertyType_attribute) => propertyType_attribute.attribute)
    attributesToPropertyType: PropertyTypeAttribute[];
}
