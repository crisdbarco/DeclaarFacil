import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, IsBoolean } from 'class-validator';

export class CreateRequestDto {
  @IsBoolean() // Adicionando a validação para o is_admin
  @IsOptional()
  @ApiProperty()
  is_admin?: boolean; // Inclua esta propriedade

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'ID da declaração associada a esta solicitação' })
  declarationId: string;
}
