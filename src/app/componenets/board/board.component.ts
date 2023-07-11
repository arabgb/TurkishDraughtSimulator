import { Component, OnInit } from '@angular/core';
import { CoreService } from 'src/app/core/core.service';
import { SquireInterface } from 'src/app/core/interfaces/square.interface';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {

  constructor(private coreService : CoreService) { }

  ngOnInit(): void {
  }

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
