import { Component } from '@angular/core';
import {placarItem} from "../placar-item/placar-item.component";

@Component({
  selector: 'app-placar',
  templateUrl: './placar.component.html',
  styleUrl: './placar.component.css'
})
export class PlacarComponent {

  placarItens: placarItem[] = [
    {
      numero: 1,
      nome: 'Jogador 1',
      pontuacao: 0  
    },
    {
      numero: 2,
      nome: 'Jogador 2',
      pontuacao: 0
    }
  ] 

}
