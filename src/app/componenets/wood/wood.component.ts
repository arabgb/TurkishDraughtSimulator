import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { GameService } from 'src/app/core/game.service';
import { SquireInterface } from 'src/app/core/interfaces/square.interface';

@Component({
  selector: 'app-wood',
  templateUrl: './wood.component.html',
  styleUrls: ['./wood.component.scss']
})
export class WoodComponent implements OnInit {

  @Input() square : SquireInterface = { column:-1, row: -1, king: false, player:-1, selected : false };
  @Output() clicked : EventEmitter<SquireInterface> = new EventEmitter();

  constructor (private gameService : GameService) {}
  player1 :any = {
    color: '#FFFFFF'
  }

  player2: any = {
    color: '#00000E'
  }

 


  ngOnInit(): void {


  }

  onClick() : void {
    this.clicked.emit(this.square);
  }




}
