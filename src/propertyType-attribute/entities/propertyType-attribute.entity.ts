import { Attribute } from "src/attribute/entities/attribute.entity";
import { PropertyTypee } from "src/propertyType/entities/propertyType.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

//@Entity({name:'propertyType_attribute' })
@Entity()
export class PropertyTypeAttribute {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Attribute, (attribute) => attribute.attributesToPropertyType , {  eager: true, onDelete: 'CASCADE' })
    attribute: Attribute;

    @ManyToOne(() => PropertyTypee, (propertyType) => propertyType.propertyTypies , {  eager: true, onDelete: 'CASCADE' })
    propertyType: PropertyTypee;

    @Column()
    value: string;
}
