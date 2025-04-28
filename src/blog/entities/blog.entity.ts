import { User } from "src/user/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { BlogPhoto } from "./blog-photo.entity";

@Entity()
export class Blog {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    title: string;

    
    @Column()
    content: string;
    
    @ManyToOne(() => User, (user) => user.blogs)
    user: User;
    
    @OneToOne(() => BlogPhoto)
    @JoinColumn()
    photo: string;
}
