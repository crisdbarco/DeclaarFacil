export class CreateUserDto {
    name: string;
    email: string;
    cpf: string;
    rg: string;
    issuing_agency: string;
    postal_code: string;
    street: string;
    house_number: string;
    complement?: string;
    neighborhood: string;
    city: string;
    state: string;
    password: string;
  }