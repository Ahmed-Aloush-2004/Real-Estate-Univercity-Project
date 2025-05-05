import { Attribute } from "src/attribute/entities/attribute.entity";
import { Property } from "src/property/entities/property.entity";
import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class PropertyType {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @OneToMany(() => Property, (property) => property.propertyType)
    properties: Property[];

    @ManyToMany(() => Attribute , { cascade: true  }) // optional eager
    @JoinTable()
    attributes: Attribute[]; // ✅ array, not singular
}
