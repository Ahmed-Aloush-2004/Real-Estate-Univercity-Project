import { Property_Problem } from "src/property/property_problem.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Problem {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @OneToMany(() => Property_Problem , (problem_property) => problem_property.problem)
    problemOnProperty: Property_Problem[];
}
