import { Office } from "src/office/entities/office.entity";
import { Property } from "src/property/entities/property.entity";
import { User } from "src/user/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";



@Entity()
export class OfficeComment {

    @PrimaryGeneratedColumn('uuid')
    id: string;


    @Column({
        type: "varchar",
        length: 2048,
        nullable: false,
    })
    content: string;


    @ManyToOne(() => User, { eager: true })
    @JoinColumn()
    user: User;

    @ManyToOne(()=> Office, (office)=> office.officeComments)
    @JoinColumn()
    office: Office;

}