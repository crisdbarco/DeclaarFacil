import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])],  // Importa o repositório da entidade User
  providers: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
