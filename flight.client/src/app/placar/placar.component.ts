import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-placar',
  templateUrl: './placar.component.html',
  styleUrl: './placar.component.css'
})


export class PlacarComponent {
    constructor(private http: HttpClient) {}
    public placarItens: PlacarItem[] = [];

    ngOnInit(){


    }

    public atualizarPlacar(novoPlacarItem:PlacarItem) {

        this.placarItens.push(novoPlacarItem);
            return;
        this.http.post<PlacarItem>('/api/atualizarPlacar', novoPlacarItem).subscribe(placarItem => {
            console.log('Updated config:', placarItem);
          });
    }

}


export interface PlacarItem {
    posicao: number;
    pontuacao: number;
    nome: string;
  }