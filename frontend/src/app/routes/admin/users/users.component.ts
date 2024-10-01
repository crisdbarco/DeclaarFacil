import { Component } from '@angular/core';
import { MenuComponent } from '../../../core/layout/menu/menu.component';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [MenuComponent],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css',
})
export class UsersComponent {}
