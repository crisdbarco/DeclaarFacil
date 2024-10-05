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
import { FinalizeDeclarationConfirmComponent } from './dialog/finalize-declaration-confirm/finalize-declaration-confirm.component';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { DeclarationRequestService } from '../../../shared/services/declaration-request.service';

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

const RESPONSE_DATA: DeclarationRequestType[] = [
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
  toast = inject(NgToastService);

  constructor(
    private router: Router,
    private declarationRequestService: DeclarationRequestService
  ) {}

  checkboxLabel(row: DeclarationRequestType): string {
    return `${
      this.selection.isSelected(row) ? 'deselecionar' : 'selecionar'
    } a pessoa ${row.name}`;
  }

  openGenerateDeclarationConfirmDialog() {
    const pendingRequests: DeclarationRequestType[] =
      this.selection.selected.filter(
        (request: DeclarationRequestType) => request.status === 'pending'
      );

    let dialogRef = this.dialog.open(GenerateDeclarationConfirmComponent, {
      data: {
        requests: pendingRequests,
      },
      width: '60%',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.generateDeclarations(pendingRequests);
      }
    });
  }

  generateDeclarations(pendingRequests: DeclarationRequestType[]) {
    // TODO: Aqui falta a requisição de gerar a declaracão e precisa ser bloqueado o botão de gerar enquanto nao terminar a requisiçao

    // TODO: substituir o valor pelo retorno da request
    this.declarationRequestService.setGeneratedDeclarations(RESPONSE_DATA);

    this.router.navigate(['/completed-declarations']);
  }

  openFinalizeDeclarationConfirmDialog() {
    const processingRequests: DeclarationRequestType[] =
      this.selection.selected.filter(
        (request: DeclarationRequestType) => request.status === 'processing'
      );

    let dialogRef = this.dialog.open(FinalizeDeclarationConfirmComponent, {
      data: {
        requests: processingRequests,
      },
      width: '60%',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.finalizeDeclarations(processingRequests);
      }
    });
  }

  finalizeDeclarations(processingRequests: DeclarationRequestType[]) {
    // TODO: Aqui falta a requisição de finalizar a solicitação
    this.toast.success(
      'Sua declaração foi finalizada com sucesso!',
      'Declaração Finalizada',
      5000
    );
  }
}
