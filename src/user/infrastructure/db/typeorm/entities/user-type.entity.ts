import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'tipo_usuario' })
export class UserTypeEntity {
  @PrimaryColumn({ name: 'id' })
  id: number;

  @Column({ name: 'descripcion' })
  description?: string;
}
