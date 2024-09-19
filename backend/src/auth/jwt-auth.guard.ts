import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { IS_PUBLIC_KEY } from './public.decorator';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private jwtService: JwtService,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true; // Permite acesso à rota pública
    }

    // Código para verificar se o token JWT é válido
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization?.split(' ')[1];

    if (!token) {
      return false; // Bloqueia se o token não estiver presente
    }

    try {
      const decoded = this.jwtService.verify(token);
      request.user = decoded;
      return true; // Permite acesso se o token for válido
    } catch (err) {
      console.error(err);
      return false; // Bloqueia se o token for inválido
    }
  }
}
