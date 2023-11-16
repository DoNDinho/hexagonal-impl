import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn
} from 'typeorm';
import { UserTypeEntity } from './user-type.entity';

@Entity({ name: 'usuario' })
export class UserEntity {
  @PrimaryGeneratedColumn({ name: 'id' })
  id?: number;

  @PrimaryColumn({ name: 'email' })
  email: string;

  @ManyToOne(() => UserTypeEntity, (userTypeEntity) => userTypeEntity.id)
  @JoinColumn({ name: 'idtipousuario' })
  userType: UserTypeEntity;

  @Column({ name: 'nombre' })
  name: string;

  @Column({ name: 'telefono' })
  phone: string;

  @Column({ name: 'edad' })
  age: number;
}
