import { Attribute } from "src/attribute/entities/attribute.entity";
import { Property } from "src/property/property.entity";
import { User } from "src/user/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Property_Attributes {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Attribute, (attribute) => attribute.attributeToProperty , { onDelete: 'CASCADE' })
    attribute: Attribute;

    @ManyToOne(() => Property, (property) => property.propertyAttribue , { onDelete: 'CASCADE' })
    property: Property;

    @Column()
    value: string;
}
