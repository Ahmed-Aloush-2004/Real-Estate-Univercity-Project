import { Photo } from "src/photo/photo.entity";
import { Property } from "src/property/property.entity";
import { User } from "src/user/user.entity";
import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";



@Entity()
export class Office {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        type: 'varchar',
        nullable: false
    })
    name: string

    @OneToOne(() => Photo)
    @JoinColumn()
    license: Photo;

    @Column({
        type: 'numeric',
        nullable: true,
        default: 0,
    })
    rating: number;

    @OneToOne(() => User, (user) => user.office)
    @JoinColumn()
    manager: User;

    @OneToMany(() => Property, (property) => property.office)
    properties: Property[];

    
    
    
    
}




// @OneToMany(() => Property, (property) => property.realEstateOffice, { cascade: true })
// properties: Property[];
