import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from '../users/user.entity'; // Assumindo que você já tem a entidade User

@Entity('requests')
export class Request {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  address: string; // Endereço solicitado

  @ManyToOne(() => User, (user) => user)
  user: User; // Relação com o usuário que fez a solicitação

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ default: 'pending' })
  status: string;
}
