import { Component } from '@angular/core';
import { CoreService } from './core/core.service';
import { SquireInterface } from './core/interfaces/square.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'TurkishDraughtSimulator';

  constructor (private coreService : CoreService) {}




}
