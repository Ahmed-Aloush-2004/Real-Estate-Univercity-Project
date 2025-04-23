import { Property } from "src/property/property.entity";
import { Upload } from "src/uploads/upload.entity";
import { User } from "src/users/user.entity";
import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";



@Entity()
export class RealEstateOffice {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        type: 'varchar',
        nullable: false
    })
    name: string


    @Column({
        type: 'varchar',
        nullable: true
    })
    description?: string;



    @OneToOne(() => Upload, { onDelete: 'SET NULL', nullable: true, cascade: true })
    @JoinColumn()
    photo: Upload;

    @OneToOne(() => User, (user) => user.realEstateOffice)
    @JoinColumn()
    manager: User;

    @OneToMany(() => Property, (property) => property.realEstateOffice, { cascade: true })
    properties: Property[];
 
    // @OneToOne(() => Upload)
    // photo: Upload;
    // // logo: Upload; 


    // @OneToOne(() => User)
    // manager: User

    // @OneToMany(() => Property,(property)=> property.realEstateOffice)
    // properties: Property[];
}