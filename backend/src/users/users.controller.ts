import { Controller, Post, Body, Put, Param, NotFoundException, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/auth/public.decorator';
import { User } from './user.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ description: 'Create user' })
  @ApiBody({ type: CreateUserDto, description: 'Request body.' })
  @Public()
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @ApiOperation({ description: 'Update user' })
  @ApiBody({ type: UpdateUserDto, description: 'Request body for updating user.' })
  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async updateUser(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto): Promise<Omit<User, 'password'>> {
    const user = await this.usersService.update(id, updateUserDto);

    // Verifique se o usuário foi encontrado após a atualização
    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user; // Retorna o usuário sem a senha
  }
}
