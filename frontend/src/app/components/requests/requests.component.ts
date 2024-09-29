import { Component } from '@angular/core';
import { MenuComponent } from '../menu/menu.component';

@Component({
  selector: 'app-requests',
  standalone: true,
  imports: [MenuComponent],
  templateUrl: './requests.component.html',
  styleUrl: './requests.component.css'
})
export class RequestsComponent {

}
