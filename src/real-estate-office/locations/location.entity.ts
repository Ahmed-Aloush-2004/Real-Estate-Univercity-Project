import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";



@Entity()
export class Location{
    @PrimaryGeneratedColumn('uuid')
    id:string;

    @Column()
    city: string;
  
    @Column()
    street: string;
  
    @Column({ nullable: true })
    zipCode?: string;

    // @Column()
    // country: string;
  
    // @Column()
    // state: string;
    
    // // Relationships
    // @OneToMany(() => Property, property => property.location)
    // properties: Property[];

}