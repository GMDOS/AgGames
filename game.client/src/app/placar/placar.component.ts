import { HttpClient } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { placarItem } from "../placar-item/placar-item.component";

@Component({
  selector: 'app-placar',
  templateUrl: './placar.component.html',
  styleUrl: './placar.component.css'
})


export class PlacarComponent {
  // constructor(private http: HttpClient) { }
  @Input() placarItens!: placarItem[];

  // public placarItens: placarItem[] = [
  //   {
  //     posicao: 1,
  //     nome: 'Jogador 1',
  //     pontuacao: 0
  //   },
  //   {
  //     posicao: 2,
  //     nome: 'Jogador 2',
  //     pontuacao: 0
  //   }
  // ]

  ngOnInit() {


  }

  public atualizarPlacar(novoPlacarItem: placarItem) {

    // this.placarItens.push(novoPlacarItem);
    //     return;
    // this.http.post<PlacarItem>('/api/atualizarPlacar', novoPlacarItem).subscribe(placarItem => {
    //     console.log('Updated config:', placarItem);
    //   });

  }
}
