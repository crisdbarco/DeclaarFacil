import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Declaration } from './declaration.entity';
import { DeclarationService } from './declaration.service';
import { DeclarationController } from './declaration.controller';
import { User } from 'src/users/user.entity';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Module({
  imports: [TypeOrmModule.forFeature([Declaration, User])], // Importa o repositório Declaration
  controllers: [DeclarationController],
  providers: [
    DeclarationService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
  exports: [DeclarationService], // Exporta o serviço se necessário em outros módulos
})
export class DeclarationModule {}
