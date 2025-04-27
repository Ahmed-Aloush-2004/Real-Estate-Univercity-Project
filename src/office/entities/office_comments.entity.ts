import { User } from "src/user/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Office } from "./office.entity";

@Entity()
export class Office_Comments{

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, (user) => user.commentOnOffice , { onDelete: 'CASCADE' })
    user: User;
    
    @ManyToOne(() => Office, (office) => office.commentBy , { onDelete: 'CASCADE' })
    office: Office;

    @Column()
    content: string;
}