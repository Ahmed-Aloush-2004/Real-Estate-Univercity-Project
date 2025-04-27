
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm'
import { UserRole } from '../enums/user-role.enum';
import { Office } from 'src/office/entities/office.entity';
import { Photo } from 'src/photo/photo.entity';
import { Complaint } from 'src/complaints/entities/complaint.entity';
import { Favorite } from 'src/favorite/entities/favorite.entity';
import { Property_Comments } from 'src/property_comments/entities/property_comment.entity';
import { Office_Comments } from 'src/office/entities/office_comments.entity';
import { Blog } from 'src/blog/entities/blog.entity';

@Entity()
export class User {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        type: 'varchar',
        length: 96,
        nullable: true,
    })
    firstName: string;


    @Column({
        type: 'varchar',
        length: 96,
        nullable: true,
    })
    lastName: string;

    @Column({
        type: 'varchar',
        length: 16,
        nullable: false,
    })
    phoneNumber: string;


    @Column({
        type: 'varchar',
        length: 96,
        nullable: false,
        unique: true,
    })
    email: string;


    @OneToOne(() => Photo, { onDelete: 'SET NULL', nullable: true })
    @JoinColumn()
    photo?: Photo;

    @Column({
        type: 'enum',  
        enum: UserRole,
        nullable: false,
        default: UserRole.Customer
    })
    role: UserRole;

    @Column({
        type: 'varchar',
        length: 96,
        nullable: false,
    })
    password: string;

    @OneToOne(() => Office, (office) => office.manager)
    office?: Office;

    //@@@@@@@@@@@@@@@@
    @OneToMany(() => Complaint, (complaint) => complaint.user)
    complaintsBy: Complaint[];

    //@@@@@@@@@@@@@@@@
    @OneToMany(() => Favorite, (favorite) => favorite.user)
    favoriteProperty: Favorite[];

    //@@@@@@@@@@@@@@@@
    @OneToMany(() => Property_Comments, (property_comment) => property_comment.user)
    commentOnProperty: Property_Comments[];
    
    //@@@@@@@@@@@@@@@@
    @OneToMany(() => Office_Comments, (comment) => comment.user)
    commentOnOffice: Office_Comments[];

    //@@@@@@@@@@@@@@@@
    @ManyToOne(() => Blog, (blogs) => blogs.user)
    blogs: Blog[];
}







