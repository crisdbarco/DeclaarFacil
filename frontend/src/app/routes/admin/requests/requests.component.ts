import { Component } from '@angular/core';
import { MenuComponent } from '../../../core/layout/menu/menu.component';

@Component({
  selector: 'app-requests',
  standalone: true,
  imports: [MenuComponent],
  templateUrl: './requests.component.html',
  styleUrl: './requests.component.css',
})
export class RequestsComponent {}
