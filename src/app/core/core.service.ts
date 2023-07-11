import { Injectable } from '@angular/core';
import { SquireInterface } from './interfaces/square.interface';
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CoreService {


  private squares : SquireInterface[][] = [];

  private current_turn : BehaviorSubject<number> = new BehaviorSubject(-1);
  current_turn_obs = this.current_turn.asObservable();
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

    // if the current player click on his wood correctly
    if (this.current_turn.value == square.player) {
      this.selected_square = square;
      console.log("Square selected!");
      
    }
    
    else {
      // check if we can move to this suqare login here
      if (this.selected_square != null && square.player == -1)
      {
        console.log("Calculate if we can move to this sequeare .....");
        this.selected_square = null;
        
      }
      else {
        console.log("Wrong click!");
        
      }

      
    }
  }

  
}
