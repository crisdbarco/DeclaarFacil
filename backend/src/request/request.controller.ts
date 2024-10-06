import { Controller, Post, Request, Get, Param } from '@nestjs/common';
import { RequestService } from './request.service';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('requests')
@Controller('requests')
export class RequestController {
  constructor(private readonly requestService: RequestService) {}

  @ApiOperation({
    description:
      'Retorna todas as solicitações de declarações realizadas. Apenas o usuário com privilégio de administrador pode visualizar as solicitações.',
  })
  @ApiBearerAuth('access-token')
  @Get()
  async getRequests(@Request() req) {
    return this.requestService.getRequests(req.user.sub);
  }

  @ApiOperation({
    description:
      'Permite que um usuário solicite a geração de uma nova declaração. O usuário deve estar autenticado para fazer a solicitação e não deve ser um admin.',
  })
  @ApiParam({
    name: 'declarationId',
    type: 'string',
    description: 'ID da declaração',
  })
  @ApiBearerAuth('access-token')
  @Post(':declarationId')
  async createRequest(@Request() req, @Param() param) {
    return this.requestService.createRequest(param.declarationId, req.user.sub);
  }

  @ApiOperation({
    description:
      'Retorna todas as solicitações de declarações realizadas pelo usuário logado. Apenas o próprio usuário autenticado pode visualizar suas solicitações, proporcionando um histórico completo de suas declarações.',
  })
  @ApiBearerAuth('access-token')
  @Get('my-requests')
  async getUserRequests(@Request() req) {
    return this.requestService.getRequestsByUser(req.user.sub);
  }
}
