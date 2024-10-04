import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Declaration } from './declaration.entity';

@Injectable()
export class DeclarationService {
  constructor(
    @InjectRepository(Declaration)
    private declarationRepository: Repository<Declaration>,
  ) {}

  async createDeclaration(content: string): Promise<Declaration> {
    const declaration = this.declarationRepository.create({ content });
    return this.declarationRepository.save(declaration);
  }
}
