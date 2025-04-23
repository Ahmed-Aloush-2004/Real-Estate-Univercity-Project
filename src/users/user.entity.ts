
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm'
import { UserRole } from './enums/user-role.enum';
import { Upload } from 'src/uploads/upload.entity';
import { RealEstateOffice } from 'src/real-estate-office/real-estate-office.entity';

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

    @OneToOne(() => RealEstateOffice, (realEstateOffice) => realEstateOffice.manager, { nullable: true })
    realEstateOffice?: RealEstateOffice;
    

    // @Column({
    //     type: 'varchar',
    //     length: 32,
    //     nullable: false,
    //     unique: true,
    // })
    // personalIdentificationCardNumber: string;

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


    @OneToOne(() => Upload)
    @JoinColumn()
    upload?: Upload; // the inverse relation to the Upload entity

}