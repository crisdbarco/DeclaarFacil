import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { Public } from './public.decorator';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ description: 'Login user' })
  @ApiBody({ type: LoginDto, description: 'Request body.' })
  @Public() // Esta rota será pública, sem necessidade de autenticação
  @Post('login') // Mapeia o método POST para /auth/login
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }
}
