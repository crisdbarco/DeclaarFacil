import { Controller, Post, Body } from '@nestjs/common';
import { DeclarationService } from './declaration.service';
import { CreateDeclarationDto } from './dto/create-declaration.dto'; // Certifique-se de que o caminho está correto
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('declarations')
@Controller('declarations')
export class DeclarationController {
  constructor(private readonly declarationService: DeclarationService) {}

  @ApiOperation({
    description:
      'Permite que um usuário com privilégios de administrador crie uma nova declaração no sistema. O administrador deve fornecer as informações necessárias para a criação da declaração. Apenas usuários autenticados com permissão de admin podem acessar essa funcionalidade.',
  })
  @ApiBody({ type: CreateDeclarationDto, description: 'Request body.' })
  @ApiBearerAuth('access-token')
  @Post('create')
  async create(@Body() createDeclarationDto: CreateDeclarationDto) {
    return this.declarationService.createDeclaration(createDeclarationDto);
  }
}
