import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import axios from 'axios';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AuthService } from '../../../shared/services/auth.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  imports: [
    CommonModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatProgressSpinnerModule,
  ]
})
export class ProfileComponent implements OnInit {
  profileForm!: FormGroup;
  isLoading = false;
  states: string[] = ['AC', 'AL', 'AP', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 
    'MG', 'MS', 'MT', 'PA', 'PB', 'PE', 'PI', 'PR', 'RJ', 
    'RN', 'RO', 'RR', 'RS', 'SC', 'SE', 'SP', 'TO'];
  errorMessage: string | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.loadUserData();
  }

  initializeForm() {
    this.profileForm = this.formBuilder.group({
      name: [{ value: '', disabled: true }],
      email: [{ value: '', disabled: true }],
      cpf: [{ value: '', disabled: true }],
      rg: [{ value: '', disabled: true }],
      issuing_agency: [{ value: '', disabled: true }],
      postal_code: [{ value: '', disabled: true }],
      street: [{ value: '', disabled: true }],
      house_number: [{ value: '', disabled: true }],
      complement: [{ value: '', disabled: true }],
      neighborhood: [{ value: '', disabled: true }],
      city: [{ value: '', disabled: true }],
      state: [{ value: '', disabled: true }],
    });
  }

  async loadUserData() {
    try {
      this.isLoading = true;
      const response = await axios.get('http://localhost:3000/users', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      this.profileForm.patchValue(response.data);
    } catch (error) {
      this.errorMessage = 'Erro ao carregar os dados do usuário.';
    } finally {
      this.isLoading = false;
    }
  }

  onEdit() {
    this.router.navigate(['/user-update']);
  }
}