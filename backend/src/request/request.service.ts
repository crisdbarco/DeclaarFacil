// request.service.ts
import {
  Injectable,
  ConflictException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Request as RequestEntity, RequestStatus } from './request.entity';
import { User } from '../users/user.entity';
import { UsersService } from 'src/users/users.service';
import { DeclarationService } from 'src/declaration/declaration.service';

@Injectable()
export class RequestService {
  constructor(
    private readonly usersService: UsersService,
    private readonly declarationService: DeclarationService,

    @InjectRepository(RequestEntity)
    private requestRepository: Repository<RequestEntity>,
  ) {}

  async createRequest(
    declarationId: string,
    userId: string,
  ): Promise<RequestEntity> {
    const user = await this.usersService.findById(userId);
    if (user && user.is_admin) {
      throw new ForbiddenException(
        'You do not have permission to perform this action.',
      );
    }

    const declaration = await this.declarationService.findById(declarationId);
    if (!declaration) {
      throw new ForbiddenException('Declaration not found.');
    }

    const hasPendingRequest = await this.checkForPendingRequests(
      userId,
      declarationId,
    );
    if (hasPendingRequest) {
      throw new ConflictException(
        'You already have a pending request. Please wait for its completion before requesting again.',
      );
    }

    const request = this.requestRepository.create({
      user,
      declaration,
    });

    return this.requestRepository.save(request);
  }

  async getRequestsByUser(user: User): Promise<RequestEntity[]> {
    return this.requestRepository.find({
      where: { user: user },
      order: { createdAt: 'DESC' }, // Ordena pela data de criação
    });
  }

  async checkForPendingRequests(
    userId: string,
    declarationId: string,
  ): Promise<boolean> {
    const pendingRequest = await this.requestRepository.findOne({
      where: {
        user: { id: userId },
        declaration: { id: declarationId },
        status: RequestStatus.PENDING, // Verificar se há uma solicitação com status 'pending'
      },
    });

    return !!pendingRequest; // Retorna true se existir uma solicitação pendente
  }
}
