import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Declaration } from './declaration.entity';
import { CreateDeclarationDto } from './dto/create-declaration.dto'; // Importar o DTO
import { UsersService } from 'src/users/users.service';

@Injectable()
export class DeclarationService {
  constructor(
    private readonly usersService: UsersService,

    @InjectRepository(Declaration)
    private declarationRepository: Repository<Declaration>,
  ) {}

  async getDeclarations(): Promise<Declaration[]> {
    return await this.declarationRepository.find();
  }

  async createDeclaration(
    userId: string,
    createDeclarationDto: CreateDeclarationDto,
  ): Promise<Declaration> {
    const user = await this.usersService.findById(userId);
    if (user && !user.is_admin) {
      throw new ForbiddenException(
        'You do not have permission to perform this action.',
      );
    }
    const declaration = this.declarationRepository.create({
      ...createDeclarationDto,
      user,
    });
    return this.declarationRepository.save(declaration);
  }

  async updateDeclaration(
    userId: string,
    declarationId: string,
    updateDeclarationDto: CreateDeclarationDto,
  ): Promise<Declaration> {
    const user = await this.usersService.findById(userId);
    if (user && !user.is_admin) {
      throw new ForbiddenException(
        'You do not have permission to perform this action.',
      );
    }

    const declaration = await this.declarationRepository.findOne({
      where: { id: declarationId },
    });
    if (!declaration) {
      throw new NotFoundException('Declaration not found.');
    }

    declaration.title = updateDeclarationDto.title ?? declaration.title;
    declaration.content = updateDeclarationDto.content ?? declaration.content;

    return this.declarationRepository.save(declaration);
  }
}
