import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Declaration } from './declaration.entity';
import { DeclarationService } from './declaration.service';
import { DeclarationController } from './declaration.controller';
import { User } from 'src/users/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Declaration, User])], // Importa o repositório Declaration
  controllers: [DeclarationController],
  providers: [DeclarationService],
  exports: [DeclarationService], // Exporta o serviço se necessário em outros módulos
})
export class DeclarationModule {}
