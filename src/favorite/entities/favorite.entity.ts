import { Property } from "src/property/property.entity";
import { User } from "src/user/entities/user.entity";
import { Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Favorite {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, (user) => user.favoriteProperty , { onDelete: 'CASCADE' })
    user: User;
    
    @ManyToOne(() => Property, (property) => property.favoriteBy , { onDelete: 'CASCADE' })
    property: Property;
}
