import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('declarations')
export class Declaration {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  content: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;
}
