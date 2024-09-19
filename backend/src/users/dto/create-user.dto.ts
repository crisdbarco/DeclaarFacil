import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @ApiProperty()
  name: string;

  @IsEmail()
  @ApiProperty()
  email: string;

  @IsString()
  @ApiProperty()
  cpf: string;

  @IsString()
  @ApiProperty()
  rg: string;

  @IsString()
  @ApiProperty()
  issuing_agency: string;

  @IsString()
  @ApiProperty()
  postal_code: string;

  @IsString()
  @ApiProperty()
  street: string;

  @IsString()
  @ApiProperty()
  house_number: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  complement?: string;

  @IsString()
  @ApiProperty()
  neighborhood: string;

  @IsString()
  @ApiProperty()
  city: string;

  @IsString()
  @ApiProperty()
  state: string;

  @IsString()
  @ApiProperty()
  password: string;
}
