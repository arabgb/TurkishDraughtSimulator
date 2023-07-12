import { Component, OnInit } from '@angular/core';
import { CoreService } from 'src/app/core/core.service';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent implements OnInit {

  constructor(private coreService : CoreService) { }


  turn_player:number = -1;
  ngOnInit(): void {
    this.coreService.current_turn_obs.subscribe(player => {
      this.turn_player = player
    })
  }

}
