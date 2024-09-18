import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    // outros componentes...
  ],
  imports: [
    // outros módulos...
    FormsModule, // Necessário para [(ngModel)]
    ReactiveFormsModule
  ],
  bootstrap: [/* componente principal */]
})
export class AppModule {}