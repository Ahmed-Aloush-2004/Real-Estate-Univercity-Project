import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";





@Entity()
export class Location {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  street: string;

  @Column()
  neighborhood: string;

  @Column()
  city: string;

  @Column()
  governorate: string;

  @Column({ nullable: true })
  postalCode?: string;

  @Column({ nullable: true })
  buildingNumber?: string;

  @Column({ nullable: true })
  apartmentNumber?: string;

  @Column({ nullable: true, type: 'decimal', precision: 10, scale: 7 })
  latitude?: number;

  @Column({ nullable: true, type: 'decimal', precision: 10, scale: 7 })
  longitude?: number;


}





















// import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";



// @Entity()
// export class Location {
//     @PrimaryGeneratedColumn('uuid')
//     id: string;

//     @Column()
//     governorate: string;

//     @Column()
//     province: string;

//     @Column()
//     city: string;

//     @Column()
//     street: string;

//     @Column({ nullable: true })
//     zipCode?: string;

//     // // Relationships
//     // @OneToMany(() => Property, property => property.location)
//     // properties: Property[];

// }