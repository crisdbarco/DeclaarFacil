import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { Public } from './public.decorator';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({
    summary: 'Login do usuário',
    description:
      'Realiza a autenticação de usuários na plataforma. O usuário deve fornecer um email e senha válidos. Se as credenciais estiverem corretas, um token será retornado, o qual poderá ser utilizado para acessar rotas protegidas do sistema.',
  })
  @ApiBody({ type: LoginDto, description: 'Request body.' })
  @Public()
  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }
}
