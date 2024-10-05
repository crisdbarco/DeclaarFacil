import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
// Certifique-se de que o caminho está correto
import { User } from 'src/users/user.entity';
import { Declaration } from 'src/declaration/declaration.entity';

export enum RequestStatus {
  PENDING = 'pending',
  PROCESSING = 'processing',
  COMPLETED = 'completed',
  REJECTED = 'rejected',
}

@Entity('requests')
export class Request {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, { eager: true })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Declaration, { eager: true })
  @JoinColumn({ name: 'declaration_id' })
  declaration: Declaration;

  @ManyToOne(() => User, { eager: true, nullable: true })
  @JoinColumn({ name: 'attendant_id' })
  attendant: User;

  @Column({
    type: 'enum',
    enum: RequestStatus,
    default: RequestStatus.PENDING,
  })
  status: RequestStatus;

  @Column()
  generation_date: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
