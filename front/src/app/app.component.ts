import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { JogoComponent } from './components/jogo/jogo.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [JogoComponent],
  template: `
    <app-jogo></app-jogo>
  `,
  styles: []
})
export class AppComponent {
  title = 'front';
}
