import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SearchFlightsComponent } from './search-flights/search-flights.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { GameComponent } from './game/game.component';
import { CelulaComponent } from './celula/celula.component';
import { PlacarComponent } from './placar/placar.component';
import { PlacarItemComponent } from './placar-item/placar-item.component';

@NgModule({
  declarations: [
    AppComponent,
    SearchFlightsComponent,
    NavMenuComponent,
    GameComponent,
    CelulaComponent,
    PlacarComponent,
    PlacarItemComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
