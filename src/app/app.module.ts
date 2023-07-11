import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { WoodComponent } from './componenets/wood/wood.component';
import { CoreService } from './core/core.service';
import { InfoComponent } from './componenets/info/info.component';
import { BoardComponent } from './componenets/board/board.component';

@NgModule({
  declarations: [
    AppComponent,
    WoodComponent,
    InfoComponent,
    BoardComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [CoreService],
  bootstrap: [AppComponent]
})
export class AppModule { }
