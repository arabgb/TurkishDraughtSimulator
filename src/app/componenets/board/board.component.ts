import { Component, OnInit } from '@angular/core';
import { GameService } from 'src/app/core/game.service';
import { SquireInterface } from 'src/app/core/interfaces/square.interface';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {

  squares : SquireInterface[][] = [];

  constructor(private gameService : GameService) {
    this.gameService.squares_obs.subscribe(squares => {
      this.squares = squares;
    })
   }

  ngOnInit(): void {
  }

  repeatByNumber (n : number): Array<number> {
    return Array(n);
  }

  onSquareClicked(square: SquireInterface) {
    this.gameService.squareClicked(square);
  }

}
