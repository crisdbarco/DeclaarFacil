import { IsString, IsNotEmpty } from 'class-validator';

export class CreateRequestDto {
  @IsString()
  @IsNotEmpty()
  address: string;
}
