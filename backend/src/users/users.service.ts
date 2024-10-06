import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { ConflictException, Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const { password, ...userData } = createUserDto;

    const emailExists = await this.findByEmail(userData.email);

    if (emailExists) {
      throw new ConflictException(
        'Unable to create user. Email already registered.',
      );
    }

    const identificationDocumentsExists =
      await this.findByIdentificationDocuments(userData.cpf, userData.rg);

    if (identificationDocumentsExists) {
      throw new ConflictException(
        'Unable to create user. Identification documents already registered.',
      );
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const user = this.usersRepository.create({
      ...userData,
      password: hashedPassword,
    });

    return this.usersRepository.save(user);
  }

  async getUser(id: string): Promise<Omit<User, 'password'>> {
    const user = await this.findById(id);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  async findById(id: string): Promise<User | undefined> {
    return await this.usersRepository.findOne({ where: { id } });
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return this.usersRepository.findOne({ where: { email } });
  }

  async findByIdentificationDocuments(
    cpf: string,
    rg: string,
  ): Promise<User | undefined> {
    return this.usersRepository.findOne({
      where: [
        {
          rg,
        },
        {
          cpf,
        },
      ],
    });
  }

  async update(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<Omit<User, 'password'>> {
    const emailExists = await this.findByEmail(updateUserDto.email);

    if (emailExists && emailExists.id !== id) {
      throw new ConflictException(
        'Unable to create user. Email already registered.',
      );
    }

    const identificationDocumentsExists =
      await this.findByIdentificationDocuments(
        updateUserDto.cpf,
        updateUserDto.rg,
      );

    if (
      identificationDocumentsExists &&
      identificationDocumentsExists.id !== id
    ) {
      throw new ConflictException(
        'Unable to create user. Identification documents already registered.',
      );
    }

    await this.usersRepository.update(id, updateUserDto);
    const updatedUser = await this.usersRepository.findOne({ where: { id } });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...userWithoutPassword } = updatedUser;
    return userWithoutPassword;
  }
}
