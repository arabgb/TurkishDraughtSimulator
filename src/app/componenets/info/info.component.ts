import { Component, OnInit } from '@angular/core';
import { GameService } from 'src/app/core/game.service';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent implements OnInit {

  constructor(private gameService : GameService) { }


  turn_player:number = -1;
  ngOnInit(): void {
    this.gameService.current_turn_obs.subscribe(player => {
      this.turn_player = player
    })
  }

}
