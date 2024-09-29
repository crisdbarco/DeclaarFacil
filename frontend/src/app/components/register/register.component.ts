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
import { HeaderComponent } from '../shared/components/header/header.component';

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
    HeaderComponent,
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

  constructor(private fb: FormBuilder, private router: Router) {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      cpf: ['', Validators.required],
      rg: ['', Validators.required],
      issuing_agency: ['', Validators.required],
      postal_code: ['', Validators.required],
      street: ['', Validators.required],
      house_number: ['', Validators.required],
      complement: [''],
      neighborhood: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      is_admin: [false],
    });
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
