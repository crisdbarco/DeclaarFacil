import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Request } from './request.entity';
import { User } from '../users/user.entity';

@Injectable()
export class RequestService {
  constructor(
    @InjectRepository(Request)
    private requestRepository: Repository<Request>,
  ) {}

  async createRequest(address: string, user: User): Promise<Request> {
    const newRequest = this.requestRepository.create({
      address,
      user,
      status: 'pending',
    });
    return this.requestRepository.save(newRequest);
  }

  // Outros métodos para listar, atualizar, etc.
}
