import { Injectable } from '@nestjs/common';
import { CreateRequestDto } from './dto/create-request.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Request } from './request.entity';

@Injectable()
export class RequestService {
  constructor(
    @InjectRepository(Request)
    private requestRepository: Repository<Request>,
  ) {}

  async create(createRequestDto: CreateRequestDto): Promise<Request> {
    const request = this.requestRepository.create({
      ...createRequestDto,
    });
    return this.requestRepository.save(request);
  }
}
