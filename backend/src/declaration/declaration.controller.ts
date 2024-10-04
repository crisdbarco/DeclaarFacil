import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { DeclarationService } from './declaration.service';
import { CreateDeclarationDto } from './dto/create-declaration.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('declaration')
export class DeclarationController {
  constructor(private readonly declarationService: DeclarationService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Body() createDeclarationDto: CreateDeclarationDto) {
    return this.declarationService.create(createDeclarationDto);
  }
}
