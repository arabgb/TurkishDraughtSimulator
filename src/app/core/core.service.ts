import { Injectable } from '@angular/core';
import { SquireInterface } from './interfaces/square.interface';
import { Subject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CoreService {


  private squares : SquireInterface[][] = [];

  current_turn : Subject<number> = new Subject();
  private selected_square: SquireInterface|null = null;

  constructor() { 
    this.initSquares();    
    this.current_turn.next(1);
  }



  initSquares() : void {
    for (let row=0; row < 8; row++) {
      let squares : SquireInterface[] = [] 
      for (let column=0; column < 8; column++) {
        squares.push({player: (row == 1 || row == 2) ? 2 : (row == 5 || row ==  6) ? 1 : -1, selected: false, row: row, column: column, king: false});
      }
      this.squares.push(squares);
    }
  }


  getSquare(row: number, column: number) : SquireInterface {
    return this.squares[row][column];
  }

  squareClicked(square : SquireInterface) {

  }

  
}
