import {
  Controller,
  Post,
  Body,
  UseGuards,
  Request,
  Get,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard'; // Guard para autenticar usuários
import { RequestService } from './request.service';

@Controller('requests')
export class RequestController {
  constructor(private readonly requestService: RequestService) {}

  @UseGuards(JwtAuthGuard)
  @Post('create')
  @Get('my-requests')
  async createRequest(@Body('address') address: string, @Request() req) {
    const user = req.user; // O usuário autenticado (JWT)
    return this.requestService.createRequest(address, user);
  }
  async getUserRequests(@Request() req) {
    const user = req.user; // O usuário autenticado
    return this.requestService.getRequestsByUser(user);
  }
}
