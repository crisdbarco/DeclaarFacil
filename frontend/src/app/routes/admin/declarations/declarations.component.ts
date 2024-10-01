import { Component } from '@angular/core';
import { MenuComponent } from '../../../components/menu/menu.component';

@Component({
  selector: 'app-declarations',
  standalone: true,
  imports: [MenuComponent],
  templateUrl: './declarations.component.html',
  styleUrl: './declarations.component.css',
})
export class DeclarationsComponent {}