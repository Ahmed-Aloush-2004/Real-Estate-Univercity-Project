import { Column, CreateDateColumn, Entity, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn, JoinColumn, ManyToOne, OneToMany } from "typeorm";


@Entity()
export class Photo {
  @PrimaryGeneratedColumn('uuid')
  id: string; // It should be 'string' to match UUID standard

  @Column({
    type: 'varchar',
    length: 1024,
    nullable: false,
  })
  url: string; 
  
  
  @Column({
    type: 'varchar',
    length: 1024,
    nullable: false,
  })
  publicId: string;
  
  // @ManyToOne(() => Property, (property) => property.photos)
  // @JoinColumn()
  // property: Property;



}
 