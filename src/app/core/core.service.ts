import { Injectable } from '@angular/core';
import { SquireInterface } from './interfaces/square.interface';
import { BehaviorSubject } from "rxjs";
import { eatPossibble } from './eat.posibble';
@Injectable({
  providedIn: 'root'
})
export class CoreService {


  private squares : SquireInterface[][] = [];
  private squares_subject : BehaviorSubject<SquireInterface[][]> = new BehaviorSubject(this.squares);
  squares_obs = this.squares_subject.asObservable();
  

  private current_turn : BehaviorSubject<number> = new BehaviorSubject(-1);
  current_turn_obs = this.current_turn.asObservable();
  private selected_square: SquireInterface|null = null;

  private lock_move: boolean = false;
  
  constructor() { 
    this.initSquares();    
    this.current_turn.next(1);
   
  }



  initSquares() : void {
    this.squares = [];
    for (let row=0; row < 8; row++) {
      let squares : SquireInterface[] = [] 
      for (let column=0; column < 8; column++) {
        squares.push({player: (row == 1 || row == 2) ? 2 : (row == 5 || row ==  6) ? 1 : -1, selected: false, row: row, column: column, king: false});
      }
      this.squares.push(squares);
    }

    this.squares_subject.next(this.squares);
  }


  getSquare(row: number, column: number) : SquireInterface {
    return this.squares[row][column];
  }

  squareClicked(square : SquireInterface) {

    // if the current player click on his wood correctly
    if (this.current_turn.value == square.player) {

      if (this.selected_square) {
        this.squares[this.selected_square.row][this.selected_square.column].selected = false;
      }
      // select the clicked square (wood)
      this.selected_square = square;
      this.squares[square.row][square.column].selected = true;
      this.squares_subject.next(this.squares);
      
    }
    
    else {
      // check if we can move to this suqare login here
      if (this.selected_square != null && square.player == -1)
      {
        console.log("Calculate if we can move to this sequeare .....");
        this.moveWood(this.selected_square, square);

      }
      else {
        console.log("Wrong click!");
        
      }

      
    }
  }





  moveWood(from : SquireInterface, to: SquireInterface) {

    // for now, its meen we can move
    if (to.player == -1) {

      // check if the new square is in same row or column
      if (from.row == to.row || from.column == to.column) {

        const numOfSteps = this.numOfSteps(from,to);
        // if the wood is not king, they cant move more than two step!
        if (!from.king && numOfSteps <= 2)
        {
          // normal wood cant move back, just check
          if (this.moveDirection(from,to) == 'y') { // moving in y direction
            // check if its not go back
            if (this.isMovingForward(from,to)) {
              
              if (numOfSteps == 1) { // we are sure he is not eat anything
                this.applyMove(from, to);
              }
              else {
                this.tryToEat(from,to);
              }
            }
          }
          else { // move in x direction,
            if (numOfSteps == 1) {// we are sure he is not eat anything
            this.applyMove(from, to);
            }
            else {
              this.tryToEat(from,to);
            }
          }
          
        }
        
        
       
      }

    }

  }


  // calculate number of steps
  numOfSteps(from: SquireInterface, to: SquireInterface) : number {
    if (from.column == to.column) {
      return Math.abs(from.row - to.row);
    }
    else {
      return Math.abs(from.column - to.column);
    }
  }


  // after calculation, if the player can move, just apply the moving!
  applyMove(from: SquireInterface, to: SquireInterface) {
    this.squares[from.row][from.column].player = -1
    this.squares[from.row][from.column].selected = false

    this.squares[to.row][to.column].player = this.current_turn.value;
    this.squares_subject.next(this.squares);

    this.selected_square = null;
    this.changeTurn();
  }


  isMovingForward(from: SquireInterface, to: SquireInterface) : boolean {
    if (from.player == 1) {
      console.log("Is Forward plaer 1: ", (from.row > to.row));
      
      return (from.row > to.row)
    }
    else {
      console.log("Is Forward player 2: ", (from.row < to.row));
      return (from.row < to.row)
    }
  }


  moveDirection(from: SquireInterface, to: SquireInterface) : string {
    if (from.row == to.row || from.column == to.column) {
      if (from.row == to.row) {
        console.log("Direction x")
        return "x";
      }
      else {
        console.log("Direction y")
        return "y";
      }
    }
    else {
      console.log("Direction unknown")
      return "Unknown"
    }
  }

  restart() {
    this.initSquares();
    this.current_turn.next(1);
    this.selected_square = null;
  }

  resetSquare(square : SquireInterface) {
    this.squares[square.row][square.column].player = -1
    this.squares[square.row][square.column].selected = false;
    this.squares[square.row][square.column].king = false;
  }
  setWood(square: SquireInterface, player: number, selected: boolean, king: boolean) {    
    this.squares[square.row][square.column].selected = selected;
    this.squares[square.row][square.column].player = player;
  }
  
  tryToEat(from: SquireInterface, to: SquireInterface) {
    const direction = this.moveDirection(from,to);
    let eaten_square: SquireInterface|null = null;
    if (!from.king) {
      if (direction == 'y') {
        if (from.player == 1) {
          eaten_square = this.squares[from.row-1][from.column];
        }
        else { // player 2
          eaten_square = this.squares[from.row+1][from.column];
        }
      }
      else { // y direction
        if (from.column > to.column) {
            eaten_square = this.squares[from.row][from.column-1]
        }
        else {
          eaten_square = this.squares[from.row][from.column+1]
        }
      }
    }

    console.log("Eaten Square is", eaten_square);
    
    if (eaten_square?.player != -1) {
      if (from.player == 1 && eaten_square?.player == 2) {
        this.resetSquare(eaten_square);
        this.resetSquare(from)
        this.setWood(to, 1, true, false)
        this.selected_square = to;
        
        // check if the eaten wood can eat more!
        if (!eatPossibble(to, this.squares)) {
          // cant eat more! move the cursor to next player
          this.setWood(to,to.player,false,to.king)
          this.changeTurn()
        }
        this.squares_subject.next(this.squares)
        
      }
      else if (from.player == 2 && eaten_square?.player == 1) {
        this.resetSquare(eaten_square);
        this.resetSquare(from)
        this.setWood(to, 2, true, false)
        this.selected_square = to;
        if (!eatPossibble(to, this.squares)) {
          // cant eat more! move the cursor to next player
          this.setWood(to,to.player,false,to.king)
          this.changeTurn()
        }
        this.squares_subject.next(this.squares)
      }
    }
  }


  changeTurn() {
    this.selected_square = null;
    if (this.current_turn.value == 1) {
      this.current_turn.next(2);
    }
    else {
      this.current_turn.next(1);
    }
  }


  
}
