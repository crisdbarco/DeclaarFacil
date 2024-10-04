import { IsString, IsNotEmpty } from 'class-validator';

export class CreateDeclarationDto {
  @IsString()
  @IsNotEmpty()
  content: string;
}
