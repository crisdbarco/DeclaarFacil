// request.service.ts
import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Request as RequestEntity, RequestStatus } from './request.entity';
import { User } from '../users/user.entity';

@Injectable()
export class RequestService {
  constructor(
    @InjectRepository(RequestEntity)
    private requestRepository: Repository<RequestEntity>,
  ) {}

  async createRequest(user: User): Promise<RequestEntity> {
    const hasPendingRequest = await this.checkForPendingRequests(user);
    if (hasPendingRequest) {
      throw new ConflictException(
        'Você já tem uma solicitação pendente. Aguarde a conclusão antes de solicitar novamente.',
      );
    }

    const request = this.requestRepository.create({
      user, // Adiciona o usuário à solicitação
      status: RequestStatus.PENDING,
      generation_date: new Date(), // Adiciona a data de geração
    });

    return this.requestRepository.save(request);
  }

  async getRequestsByUser(user: User): Promise<RequestEntity[]> {
    return this.requestRepository.find({
      where: { user: user },
      order: { createdAt: 'DESC' }, // Ordena pela data de criação
    });
  }

  async checkForPendingRequests(user: User): Promise<boolean> {
    const pendingRequest = await this.requestRepository.findOne({
      where: {
        user: user,
        status: RequestStatus.PENDING, // Verificar se há uma solicitação com status 'pending'
      },
    });

    return !!pendingRequest; // Retorna true se existir uma solicitação pendente
  }
}
