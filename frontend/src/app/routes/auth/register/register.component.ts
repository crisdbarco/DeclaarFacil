import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import axios from 'axios';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  registerForm: FormGroup;
  errorMessage: string = '';

  states: string[] = [
    'AC',
    'AL',
    'AP',
    'AM',
    'BA',
    'CE',
    'DF',
    'ES',
    'GO',
    'MA',
    'MT',
    'MS',
    'MG',
    'PA',
    'PB',
    'PR',
    'PE',
    'PI',
    'RJ',
    'RN',
    'RS',
    'RO',
    'RR',
    'SC',
    'SP',
    'SE',
    'TO',
  ];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private http: HttpClient
  ) {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      cpf: ['', Validators.required],
      rg: ['', Validators.required],
      issuing_agency: ['', Validators.required],
      postal_code: ['', Validators.required],
      street: [{ value: '', disabled: true }, Validators.required],
      house_number: [{ value: '', disabled: true }, Validators.required],
      complement: [{ value: '', disabled: true }],
      neighborhood: [{ value: '', disabled: true }, Validators.required],
      city: [{ value: '', disabled: true }, Validators.required],
      state: [{ value: '', disabled: true }, Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      is_admin: [false],
    });
  }

  ngOnInit(): void {
    this.registerForm.get('postal_code')?.valueChanges.subscribe((value) => {
      if (value && value.length === 8) {
        this.fetchAddressData(value);
      } else {
        this.disableAddressFields();
      }
    });
  }

  private fetchAddressData(postalCode: string): void {
    this.enableAddressFields();

    this.http.get(`https://opencep.com/v1/${postalCode}`).subscribe({
      next: (response: any) => {
        this.registerForm.patchValue({
          street: response.logradouro,
          neighborhood: response.bairro,
          complement: response.complemento,
          city: response.localidade,
          state: response.uf,
        });
      },
      error: (error) => {
        console.error('Erro ao buscar dados do endereço:', error);
      },
    });
  }

  private enableAddressFields(): void {
    this.registerForm.get('street')?.enable();
    this.registerForm.get('house_number')?.enable();
    this.registerForm.get('complement')?.enable();
    this.registerForm.get('neighborhood')?.enable();
    this.registerForm.get('city')?.enable();
    this.registerForm.get('state')?.enable();
  }

  private disableAddressFields(): void {
    this.registerForm.get('street')?.disable();
    this.registerForm.get('house_number')?.disable();
    this.registerForm.get('complement')?.disable();
    this.registerForm.get('neighborhood')?.disable();
    this.registerForm.get('city')?.disable();
    this.registerForm.get('state')?.disable();
  }

  async onSubmit() {
    if (this.registerForm.valid) {
      try {
        await axios.post(
          'http://localhost:3000/users',
          this.registerForm.value
        );
        this.router.navigate(['/success']);
      } catch (error) {
        this.errorMessage = 'Erro ao criar conta. Tente novamente.';
        console.error('Erro ao criar usuário:', error);
      }
    } else {
      this.errorMessage = 'Preencha todos os campos obrigatórios.';
    }
  }
}
