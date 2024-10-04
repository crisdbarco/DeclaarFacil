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

@Controller('declarations')
export class DeclarationController {
  constructor(private readonly declarationService: DeclarationService) {}

  @UseGuards(JwtAuthGuard)
  @Post('create')
  async create(@Body('content') content: string, @Request() req) {
    if (!req.user.is_admin) {
      throw new ForbiddenException(
        'Apenas administradores podem criar declarações.',
      );
    }

    return this.declarationService.createDeclaration(content);
  }
}
