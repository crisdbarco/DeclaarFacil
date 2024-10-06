// declaration.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Declaration } from './declaration.entity';
import { CreateDeclarationDto } from './dto/create-declaration.dto'; // Importar o DTO

@Injectable()
export class DeclarationService {
  constructor(
    @InjectRepository(Declaration)
    private declarationRepository: Repository<Declaration>,
  ) {}

  async createDeclaration(
    createDeclarationDto: CreateDeclarationDto,
  ): Promise<Declaration> {
    const declaration = this.declarationRepository.create(createDeclarationDto);
    return this.declarationRepository.save(declaration);
  }
}
