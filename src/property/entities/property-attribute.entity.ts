import { Attribute } from "src/attribute/entities/attribute.entity";
import { Property } from "src/property/entities/property.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class PropertyAttribute {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => Attribute, (attribute) => attribute.attributesToProperty, {
        eager: true,
        onDelete: 'CASCADE'
    })
    attribute: Attribute;

    @ManyToOne(() => Property, (property) => property.propertyAttributes, {
        eager: true,
        onDelete: 'CASCADE'
    })
    property: Property;

    @Column()
    value: number; // this needs to change to string
    
}
