import { Component, OnInit } from '@angular/core';
import { CoreService } from 'src/app/core/core.service';
import { SquireInterface } from 'src/app/core/interfaces/square.interface';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {

  squares : SquireInterface[][] = [];

  constructor(private coreService : CoreService) {
    this.coreService.squares_obs.subscribe(squares => {
      this.squares = squares;
    })
   }

  ngOnInit(): void {
  }

  repeatByNumber (n : number): Array<number> {
    return Array(n);
  }

  onSquareClicked(square: SquireInterface) {
    this.coreService.squareClicked(square);
  }

}
