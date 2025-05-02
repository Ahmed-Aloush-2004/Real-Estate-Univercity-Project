import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, Unique } from "typeorm";
import { BlogPhoto } from "./blog-photo.entity";
import { Office } from "src/office/entities/office.entity";

@Entity()
@Unique(["title"])
export class Blog {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => Office, (office) => office.blogs , { eager: false })
    office: Office;

    @Column()
    title: string;

    @Column()
    intro: string;

    @Column()
    content: string;
    
    
    // @OneToMany(() => BlogPhoto , (blogPhoto) => blogPhoto.blog)
    // blogPhoto: string;
}
