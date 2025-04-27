import { User } from "src/user/entities/user.entity";
import { Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Blog {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    photo: string;

    @Column()
    content: string;

    @ManyToOne(() => User , (user) => user.blogs)
    user: User;

}
