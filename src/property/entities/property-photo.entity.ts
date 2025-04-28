import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Property } from './property.entity';

@Entity()
export class PropertyPhoto {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        type: 'varchar',
        length: 1024,
        nullable: false,
    })
    url: string;


    @Column({
        type: 'varchar',
        length: 1024,
        nullable: false,
    })
    publicId: string;


    @ManyToOne(()=> Property, (property) => property.propertyPhotos)
    @JoinColumn()
    property: Property
}
