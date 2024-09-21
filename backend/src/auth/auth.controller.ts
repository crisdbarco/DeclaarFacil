import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { Public } from './public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Public() // Esta rota será pública, sem necessidade de autenticação
  @Post('login')  // Mapeia o método POST para /auth/login
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }
}
