import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-placar-item',
  templateUrl: './placar-item.component.html',
  styleUrl: './placar-item.component.css'
})



export class PlacarItemComponent {
  @Input() item!: placarItem;

}

export interface placarItem {
  posicao: number;
  nome: string;
  pontuacao: number;
}