import { Users } from "src/modules/users/contracts/entities/users";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('usuario')
export class UserSchema extends Users {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column({ name: 'emailcorp'})
    emailcorporative: string;

    @Column({ name: 'senha' })
    password: string;

    

    
  }
 