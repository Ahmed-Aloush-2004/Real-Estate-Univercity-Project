import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";




@Entity()
export class LicensePhoto {

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

}