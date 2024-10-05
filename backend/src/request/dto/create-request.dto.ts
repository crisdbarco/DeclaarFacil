import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsBoolean,
} from 'class-validator';

export class CreateRequestDto {
  @IsString()
  @IsNotEmpty()
  address: string;

  @IsBoolean() // Adicionando a validação para o is_admin
  @IsOptional()
  @ApiProperty()
  is_admin?: boolean; // Inclua esta propriedade
}
