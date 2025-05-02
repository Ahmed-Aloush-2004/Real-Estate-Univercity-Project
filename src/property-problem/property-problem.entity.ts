import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { PropertyProblemType } from "./enums/property-problem.enum";
import { Property } from "src/property/entities/property.entity";


@Entity()
export class PropertyProblem {

    @PrimaryGeneratedColumn('uuid')
    id: string; 

    @Column({
        type: 'enum',
        enum: PropertyProblemType,
        // default:PropertyProblemType.PROBLEM_1,
    })
    name: PropertyProblemType;

    @ManyToOne(()=> Property,(property)=>property.PropertyProblems) 
    @JoinColumn() 
    property:Property; 
}