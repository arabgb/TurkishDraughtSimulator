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
  game:any = {
    mainRule: {
      row: 8,
      column: 8
    }
  }


  constructor (private coreService : CoreService) {}

  repeatByNumber (n : number): Array<number> {
    return Array(n);
  }


  getSquare(row : number, column: number) : SquireInterface {
    return this.coreService.getSquare(row,column);
  }

  onSquareClicked(square: SquireInterface) {
    this.coreService.squareClicked(square);
  }
}
