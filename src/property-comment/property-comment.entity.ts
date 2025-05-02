import { Property } from "src/property/entities/property.entity";
import { User } from "src/user/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";



@Entity()
export class PropertyComment {

    @PrimaryGeneratedColumn('uuid')
    id: string;


    @Column({
        type:"varchar",
        length:2048,
        nullable:false,
    })
    content: string;


    @ManyToOne(() => User,{eager:true})
    @JoinColumn()
    user: User;

    @ManyToOne(() => Property, (property) => property.propertyComments)
    @JoinColumn()
    property: Property;

}