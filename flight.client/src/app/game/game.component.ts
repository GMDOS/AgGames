import { Component, QueryList, ViewChildren } from '@angular/core';
import { CelulaComponent, celula } from '../celula/celula.component';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrl: './game.component.css'
})

export class GameComponent {
  public width = 10;
  public height = 10;
  public celulas: celula[][] = [];
  public numeroCorreto: number = 0;
  public binario = true;
  public mensagem = '';
  public emojiDistance = '🙂';
  public emojiDirection = '';
  public currentRecord = 0;
  public topRecord = 0;
  

  @ViewChildren(CelulaComponent) celulaComponents!: QueryList<CelulaComponent>;
  ngOnInit() {
    this.topRecord = parseInt(localStorage.getItem('currentRecord') ?? "0");

    let numero = 1;
    for (let i = 0; i < this.height; i++) {
      const row: celula[] = [];
      for (let j = 0; j < this.width; j++) {
        let rand = Math.floor(Math.random() * 3);
        let state = '';
        row.push({
          numero: numero++,
          state: state,
          position: { x: j, y: i },
          color: '',
          fontColor: ''
        });
      }
      this.celulas.push(row);
    }
    this.numeroCorreto = Math.floor(Math.random() * (this.height * this.width));
  }

  checkIfCorrect(atual: celula) {
    this.currentRecord++;
    if (atual.numero == this.numeroCorreto) {
      atual.state = 'correct';
      this.mensagem = 'Acertou';
      this.emojiDistance = '😎';
      this.emojiDirection = '';
      if(this.currentRecord < this.topRecord) {
        localStorage.setItem('currentRecord', this.currentRecord.toString());
        this.topRecord = this.currentRecord;
      }
    } else {
      atual.state = 'incorrect';
      this.emojiDistance = '🥴';
      this.mensagem = 'Errou';
    }


    if (this.binario) {
      if (atual.numero < this.numeroCorreto) {
        this.emojiDirection = '👆';
        this.mensagem = 'Maior';
      } else if (atual.numero > this.numeroCorreto) {
        this.emojiDirection = '👇';
        this.mensagem = 'Menor';
      }
    }

    if (this.numeroCorreto - atual.numero == 1 || this.numeroCorreto - atual.numero == -1) {
      this.emojiDirection = '🤏';
    }

    const celulaComponent = this.celulaComponents.find(c => c.cell.numero === atual.numero);
    if (celulaComponent) {
      celulaComponent.updateCell();
    }
  }
}
