import { Office } from "src/office/office.entity";
import { User } from "src/user/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Complaint {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, (user) => user.complaintsBy , { onDelete: 'CASCADE' })
    user: User;

    @ManyToOne(() => Office, (office) => office.complaintsOnOffice , { onDelete: 'CASCADE' })
    office: Office;

    @Column()
    content: string;
}
