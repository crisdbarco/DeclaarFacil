// request.controller.ts
import {
  Controller,
  Post,
  Body,
  UseGuards,
  Request,
  Get,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RequestService } from './request.service';
import { CreateRequestDto } from './dto/create-request.dto';

@Controller('requests')
export class RequestController {
  constructor(private readonly requestService: RequestService) {}

  @UseGuards(JwtAuthGuard)
  @Post('create')
  async createRequest(
    @Body() createRequestDto: CreateRequestDto,
    @Request() req,
  ) {
    const user = req.user; // O usuário autenticado (JWT)
    return this.requestService.createRequest(user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('my-requests')
  async getUserRequests(@Request() req) {
    const user = req.user; // O usuário autenticado
    return this.requestService.getRequestsByUser(user.id);
  }
}
