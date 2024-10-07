import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsString, ArrayMinSize, IsNotEmpty } from 'class-validator';

export class GeneratePdfDto {
  @IsArray()
  @IsString({ each: true })
  @ArrayMinSize(1)
  @ApiProperty({ description: 'Lista de IDs das solicitações' })
  requestIds: string[];

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'ID da declaração a ser gerada' })
  declarationId: string;
}
