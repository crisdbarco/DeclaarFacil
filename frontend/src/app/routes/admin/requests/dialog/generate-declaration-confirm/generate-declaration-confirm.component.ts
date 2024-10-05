import { Component, inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import { DeclarationRequestType } from '../../../../../shared/domain/requests.type';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-generate-declaration-confirm',
  standalone: true,
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatButtonModule,
    MatDialogActions,
    MatDialogClose,
  ],
  templateUrl: './generate-declaration-confirm.component.html',
  styleUrl: './generate-declaration-confirm.component.css',
})
export class GenerateDeclarationConfirmComponent {
  data = inject(MAT_DIALOG_DATA);
  pendingRequests: DeclarationRequestType[] = [];

  ngOnInit() {
    this.pendingRequests = this.data.requests.filter(
      (request: DeclarationRequestType) => request.status === 'pending'
    );
  }
}
