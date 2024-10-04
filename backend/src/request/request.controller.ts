import { Controller, Post, UseGuards, Body } from '@nestjs/common';
import { RequestService } from './request.service';
import { CreateRequestDto } from './dto/create-request.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('request')
@Controller('request')
export class RequestController {
  constructor(private readonly requestsService: RequestService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Body() createRequestDto: CreateRequestDto) {
    return this.requestsService.create(createRequestDto);
  }
}
