import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto'; 
import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const { password, ...userData } = createUserDto;

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const user = this.usersRepository.create({
      ...userData,
      password: hashedPassword,
    });

    return this.usersRepository.save(user);
  }

  async findOne(email: string): Promise<User | undefined> {
    return this.usersRepository.findOne({ where: { email } });
  }

  // Método para atualizar os dados do usuário
  async update(id: string, updateUserDto: Partial<CreateUserDto>): Promise<Omit<User, 'password'> | null> { // Use Omit para não retornar a senha
    await this.usersRepository.update(id, updateUserDto); // Atualiza os dados do usuário
    const updatedUser = await this.usersRepository.findOne({ where: { id } }); // Retorna o usuário atualizado
    if (updatedUser) {
      const { password, ...userWithoutPassword } = updatedUser; // Remove a senha
      return userWithoutPassword; // Retorna o usuário sem a senha
    }
    return null; // Retorna null se não encontrar o usuário
  }
}