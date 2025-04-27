import { Property } from "src/property/property.entity";
import { User } from "src/user/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Property_Comments {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, (user) => user.commentOnProperty , { onDelete: 'CASCADE' })
    user: User;

    @ManyToOne(() => Property, (property) => property.commentBy , { onDelete: 'CASCADE' })
    property: Property;

    @Column()
    content: string;
}
