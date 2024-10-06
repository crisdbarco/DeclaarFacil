// declaration.controller.ts
import {
  Controller,
  Post,
  Body,
  UseGuards,
  Request,
  ForbiddenException,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { DeclarationService } from './declaration.service';
import { CreateDeclarationDto } from './dto/create-declaration.dto'; // Certifique-se de que o caminho está correto

@Controller('declarations')
export class DeclarationController {
  constructor(private readonly declarationService: DeclarationService) {}

  @UseGuards(JwtAuthGuard)
  @Post('create')
  async create(@Body() createDeclarationDto: CreateDeclarationDto) {
    return this.declarationService.createDeclaration(createDeclarationDto);
  }
}
