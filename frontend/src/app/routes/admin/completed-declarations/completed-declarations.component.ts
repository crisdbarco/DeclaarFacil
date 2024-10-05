import { Component } from '@angular/core';
import { DeclarationRequestType } from '../../../shared/domain/requests.type';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

const REQUEST_DATA: DeclarationRequestType[] = [
  {
    name: 'Carlos Eduardo Pereira',
    requestDate: new Date('2024-10-01'),
    status: 'completed',
    url: 'https://example.com/declaration/carlos-eduardo.pdf',
  },
  {
    name: 'Ana Beatriz Silva',
    requestDate: new Date('2024-09-28'),
    status: 'completed',
    url: 'https://example.com/declaration/ana-beatriz.pdf',
  },
  {
    name: 'José da Silva',
    requestDate: new Date('2024-09-27'),
    status: 'completed',
    url: 'https://example.com/declaration/jose-da-silva.pdf',
  },
  {
    name: 'Mariana Costa',
    requestDate: new Date('2024-09-26'),
    status: 'pending',
    url: '',
  },
  {
    name: 'Fernando Almeida',
    requestDate: new Date('2024-09-25'),
    status: 'rejected',
    url: '',
  },
];

@Component({
  selector: 'app-completed-declarations',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, RouterLink],
  templateUrl: './completed-declarations.component.html',
  styleUrl: './completed-declarations.component.css',
})
export class CompletedDeclarationsComponent {
  declarations: DeclarationRequestType[] = REQUEST_DATA;

  downloadFile(url?: string): void {
    if (!url) return;
    window.open(url, '_blank');
  }
}
