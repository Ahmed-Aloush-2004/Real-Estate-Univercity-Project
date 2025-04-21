import { Column, CreateDateColumn, Entity, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { fileTypes } from "./enums/file-type.enum";
import { User } from "src/users/user.entity";
import { Exclude } from "class-transformer";
import { Property } from "src/property/property.entity";

@Entity()
export class Upload {
  @PrimaryGeneratedColumn('uuid')
  id: string; // It should be 'string' to match UUID standard


  @Column({
    type: 'varchar',
    length: 1024,
    nullable: false,
  })
  path: string;

  @Column({
    type: 'enum',
    enum: fileTypes,
    default: fileTypes.IMAGE,
    nullable: false,
  })
  type: string;

  @Exclude()
  @Column({
    type: 'varchar',
    length: 1024,
    nullable: false,
  })
  size: number;

  @ManyToOne(() => Property, (property) => property.photos, { nullable: true, onDelete: 'CASCADE' })
  property: Property;


  // @ManyToOne(() => Property, (property) => property.photos, { nullable: true })
  // property: Property;

  @CreateDateColumn()
  createDate: Date;

  @UpdateDateColumn()
  updateDate: Date;



  // The relationship is here
  // @Exclude()
  // @OneToOne(() => User, (user) => user.upload, {
  //   onDelete: 'CASCADE'
  // })
  // @JoinColumn() // This specifies that the 'Upload' table will have the foreign key
  // user: User;  // Correcting the relationship field to be of type User, not string

  // @Column({
  //   type: 'varchar',
  //   length: 1024,
  //   nullable: false,
  // })
  // name: string;

  // @Column({
  //   type: 'varchar',
  //   length: 128,
  //   nullable: false,
  // })
  // mime: string;

}
