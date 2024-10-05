import { Component, inject } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { SelectionModel } from '@angular/cdk/collections';
import { MatButtonModule } from '@angular/material/button';
import { DatePipe } from '@angular/common';
import { DeclarationRequestType } from '../../../shared/domain/requests.type';
import { StatusPipe } from '../../../core/pipes/status.pipe';
import { MatDialog } from '@angular/material/dialog';
import { GenerateDeclarationConfirmComponent } from './dialog/generate-declaration-confirm/generate-declaration-confirm.component';

const REQUEST_DATA: DeclarationRequestType[] = [
  {
    name: 'Carlos Eduardo Pereira',
    requestDate: new Date('2024-01-15'), // Exemplo de data
    status: 'pending',
  },
  {
    name: 'Maria Clara Santos',
    requestDate: new Date('2024-02-10'),
    status: 'completed',
  },
  {
    name: 'João Pedro Almeida',
    requestDate: new Date('2024-03-05'),
    status: 'processing',
  },
  {
    name: 'Ana Beatriz Lima',
    requestDate: new Date('2024-04-20'),
    status: 'rejected',
  },
  {
    name: 'Roberto Carlos',
    requestDate: new Date('2024-05-12'),
    status: 'pending',
  },
];

@Component({
  selector: 'app-requests',
  standalone: true,
  imports: [
    DatePipe,
    MatTableModule,
    MatCheckboxModule,
    MatButtonModule,
    StatusPipe,
  ],
  templateUrl: './requests.component.html',
  styleUrl: './requests.component.css',
})
export class RequestsComponent {
  displayedColumns: string[] = ['name', 'requestDate', 'status', 'select'];
  dataSource = REQUEST_DATA;
  selection = new SelectionModel<DeclarationRequestType>(true, []);
  dialog = inject(MatDialog);

  checkboxLabel(row: DeclarationRequestType): string {
    return `${
      this.selection.isSelected(row) ? 'deselecionar' : 'selecionar'
    } a pessoa ${row.name}`;
  }

  showSelectedRows() {
    const selectedRows = this.selection.selected;
    if (selectedRows.length > 0) {
      const selectedNames = selectedRows.map((row) => row.name).join(', ');
      alert(`Solicitantes selecionados: ${selectedNames}`);
    } else {
      alert('Nenhum solicitante selecionado.');
    }
  }

  openGenerateDeclarationConfirmDialog() {
    this.dialog.open(GenerateDeclarationConfirmComponent, {
      data: {
        animal: 'panda',
        requests: this.selection.selected,
      },
      width: '60%',
    });
  }
}
