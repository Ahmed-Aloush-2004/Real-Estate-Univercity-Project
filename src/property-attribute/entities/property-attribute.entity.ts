
import { Attribute } from "src/attribute/entities/attribute.entity";
import { Property } from "src/property/entities/property.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";

//@Entity({name:'propertyType_attribute' })
@Entity()
export class PropertyAttribute {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @OneToOne(() => Attribute, { eager: true, onDelete: 'CASCADE' })
    @JoinColumn()
    attribute: Attribute;

    @ManyToOne(() => Property, (property) => property.attributes, { eager: true, onDelete: 'CASCADE' })
    property: Property;

    @Column()
    number: number;
}
