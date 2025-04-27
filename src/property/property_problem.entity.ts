import { Problem } from "src/problem/entities/problem.entity";
import { Property } from "src/property/property.entity";
import { User } from "src/user/entities/user.entity";
import { Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Property_Problem {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Property, (property) => property.favoriteBy , { onDelete: 'CASCADE' })
    property: Property;

    @ManyToOne(() => Problem, (problem) => problem.problemOnProperty , { onDelete: 'CASCADE' })
    problem: Problem;
    

}
