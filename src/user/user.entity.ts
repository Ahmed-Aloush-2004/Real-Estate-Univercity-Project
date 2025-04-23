
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm'
import { UserRole } from './enums/user-role.enum';
import { Office } from 'src/office/office.entity';
import { Photo } from 'src/photo/photo.entity';

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


    @OneToOne(() => Photo)
    @JoinColumn()
    photo: Photo;

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


    }




    


