import { Property_Problem } from "src/property/property_problem.entity";
import { Column, OneToMany, PrimaryGeneratedColumn } from "typeorm";

export class Problem {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @OneToMany(() => Property_Problem , (problem_property) => problem_property.problem)
    problemOnProperty: Property_Problem[];
}
