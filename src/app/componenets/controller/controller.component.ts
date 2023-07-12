import { Component, OnInit } from '@angular/core';
import { GameService } from 'src/app/core/game.service';

@Component({
  selector: 'app-controller',
  templateUrl: './controller.component.html',
  styleUrls: ['./controller.component.scss']
})
export class ControllerComponent implements OnInit {

  constructor(private gameService : GameService) { }

  ngOnInit(): void {
  }

  restart() {
    this.gameService.restart();
  }

}
