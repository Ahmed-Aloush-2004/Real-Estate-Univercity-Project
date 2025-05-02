import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Blog } from "./blog.entity";


@Entity()
export class BlogPhoto {

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

    //@OneToOne(()=> Blog , (blog) => blog.blogPhoto)
    @OneToOne(()=> Blog )
    @JoinColumn({name: "blog_ID"})
    blog: Blog;

}
