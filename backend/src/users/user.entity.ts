import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('users')  // Tabela 'users' no banco de dados
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  name: string;

  @Column({ unique: true, length: 100 })
  email: string;

  @Column({ unique: true, length: 11 })
  cpf: string;

  @Column({ unique: true, length: 12 })
  rg: string;

  @Column({ length: 20 })
  issuing_agency: string;

  @Column({ length: 8 })
  postal_code: string;

  @Column({ length: 100 })
  street: string;

  @Column()
  house_number: string;

  @Column({ nullable: true })
  complement: string;

  @Column({ length: 50 })
  neighborhood: string;

  @Column({ length: 50 })
  city: string;

  @Column({ length: 2 })
  state: string;

  @Column()
  password: string;

  @Column({ default: false })
  is_admin: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}