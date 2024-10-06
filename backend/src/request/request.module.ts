import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RequestController } from './request.controller';
import { RequestService } from './request.service';
import { Request } from './request.entity';
import { User } from 'src/users/user.entity';
import { Declaration } from 'src/declaration/declaration.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Request, User, Declaration])], // Registrar o repositório
  controllers: [RequestController],
  providers: [RequestService],
  exports: [RequestService], // Se você precisar usar o RequestService em outros módulos
})
export class RequestModule {}
