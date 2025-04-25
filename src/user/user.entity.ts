
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm'
import { UserRole } from './enums/user-role.enum';
import { Office } from 'src/office/office.entity';
import { Photo } from 'src/photo/photo.entity';
import { Property } from 'src/property/property.entity';

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


    @OneToOne(() => Photo, { eager:true, onDelete: 'SET NULL', nullable: true, })
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

    @ManyToMany(() => Property)
    @JoinTable()
    favoriteProperties: Property[];


}







