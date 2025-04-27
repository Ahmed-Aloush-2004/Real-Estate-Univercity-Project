import { User } from "src/user/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { isInt, Max, Min } from "class-validator";
import { Office } from "./office.entity";

@Entity()
export class Office_Rating{

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, (user) => user.commentOnOffice , { onDelete: 'CASCADE' })
    user: User;
    
    @ManyToOne(() => Office, (office) => office.commentBy , { onDelete: 'CASCADE' })
    office: Office;

    @Column()
    @Min(1)
    @Max(5)
    //@isInt()//
    rating: number;
}