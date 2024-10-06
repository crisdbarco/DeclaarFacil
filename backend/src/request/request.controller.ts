import { Controller, Post, Body, Request, Get } from '@nestjs/common';
import { RequestService } from './request.service';
import { CreateRequestDto } from './dto/create-request.dto';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('requests')
@Controller('requests')
export class RequestController {
  constructor(private readonly requestService: RequestService) {}

  @ApiOperation({
    description:
      'Permite que um usuário solicite a geração de uma nova declaração. O usuário deve estar autenticado para fazer a solicitação e não deve ser um admin.',
  })
  @ApiBody({ type: CreateRequestDto, description: 'Request body.' })
  @ApiBearerAuth('access-token')
  @Post('create')
  async createRequest(
    @Body() createRequestDto: CreateRequestDto,
    @Request() req,
  ) {
    const user = req.user; // O usuário autenticado (JWT)
    return this.requestService.createRequest(user);
  }

  @ApiOperation({
    description:
      'Retorna todas as solicitações de declarações realizadas pelo usuário logado. Apenas o próprio usuário autenticado pode visualizar suas solicitações, proporcionando um histórico completo de suas declarações.',
  })
  @ApiBearerAuth('access-token')
  @Get('my-requests')
  async getUserRequests(@Request() req) {
    const user = req.user; // O usuário autenticado
    return this.requestService.getRequestsByUser(user.id);
  }
}
