import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ReservaViagemComponent } from './reserva-viagem/reserva-viagem';

@Component({
  selector: 'app-root',
  standalone: true,
  
  imports: [RouterOutlet, ReservaViagemComponent], 
  template: `
    <main>
      <app-reserva-viagem></app-reserva-viagem>
    </main>
    <router-outlet></router-outlet>
  `,
  styleUrls: ['./app.css']
})
export class App {
  title = 'reserva-viagem-app';
}
