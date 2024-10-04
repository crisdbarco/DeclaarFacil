import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Request } from './request.entity';
import { Request as RequestEntity } from './request.entity';
import { User } from '../users/user.entity';

@Injectable()
export class RequestService {
  constructor(
    @InjectRepository(RequestEntity)
    private requestRepository: Repository<RequestEntity>,
  ) {}

  async createRequest(address: string, user: User): Promise<RequestEntity> {
    const hasPendingRequest = await this.checkForPendingRequests(user);
    if (hasPendingRequest) {
      throw new ConflictException(
        'Você já tem uma solicitação pendente. Aguarde a conclusão antes de solicitar novamente.',
      );
    }

    const Request = this.requestRepository.create({
      address,
      user,
      status: 'pending',
    });

    return this.requestRepository.save(Request);
  }
  async getRequestsByUser(user: User): Promise<RequestEntity[]> {
    return this.requestRepository.find({
      where: { user: user },
      order: { created_at: 'DESC' }, // Ordena pela data de criação
    });
  }
  async checkForPendingRequests(user: User): Promise<boolean> {
    const pendingRequest = await this.requestRepository.findOne({
      where: {
        user: user,
        status: 'pending', // Verificar se há uma solicitação com status 'pending'
      },
    });

    return !!pendingRequest; // Retorna true se existir uma solicitação pendente
  }
}
