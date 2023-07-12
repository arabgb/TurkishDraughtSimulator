import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { WoodComponent } from './componenets/wood/wood.component';
import { GameService } from './core/game.service';
import { InfoComponent } from './componenets/info/info.component';
import { BoardComponent } from './componenets/board/board.component';
import { ControllerComponent } from './componenets/controller/controller.component';

@NgModule({
  declarations: [
    AppComponent,
    WoodComponent,
    InfoComponent,
    BoardComponent,
    ControllerComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [GameService],
  bootstrap: [AppComponent]
})
export class AppModule { }
