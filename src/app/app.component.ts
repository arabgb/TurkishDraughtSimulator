import { Component } from '@angular/core';
import { GameService } from './core/game.service';
import { SquireInterface } from './core/interfaces/square.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'TurkishDraughtSimulator';

  constructor (private gameService : GameService) {}




}
