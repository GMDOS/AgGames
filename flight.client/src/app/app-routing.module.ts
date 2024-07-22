import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchFlightsComponent } from './search-flights/search-flights.component';
import { GameComponent } from './game/game.component';

const routes: Routes = [
  { path: 'search-flights', component: SearchFlightsComponent },
  { path: 'game', component: GameComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
