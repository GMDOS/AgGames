import { Component, QueryList, ViewChildren } from '@angular/core';
import { CelulaComponent, Celula} from '../celula/celula.component';
import { PlacarComponent, PlacarItem} from '../placar/placar.component';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrl: './game.component.css',
})
export class GameComponent {
  public width = 10;
  public height = 10;
  public celulas: Celula[][] = [];
  public numeroCorreto: number = 0;
  public binario = true;
  public mensagem = '';
  public emojiDistance = '🙂';
  public emojiDirection = '';
  public currentRecord = 0;
  public topRecord = 0;



  @ViewChildren(CelulaComponent) celulaComponents!: QueryList<CelulaComponent>;

  ngOnInit() {
    for (let i = 0; i < 10; i++) {
        let placarItem : PlacarItem = {posicao: i, pontuacao: i + 7, nome: "João" + i} 
        // PlacarComponent.atualizarPlacar(placarItem)
    }
    this.topRecord = parseInt(localStorage.getItem('currentRecord') ?? '0');

    let numero = 1;
    for (let i = 0; i < this.height; i++) {
      const row: Celula[] = [];
      for (let j = 0; j < this.width; j++) {
        let rand = Math.floor(Math.random() * 3);
        let state = '';
        row.push({
          numero: numero++,
          state: state,
          position: { x: j, y: i },
          color: '',
          fontColor: '',
        });
      }
      this.celulas.push(row);
    }
    this.numeroCorreto = Math.floor(Math.random() * (this.height * this.width));
  }

  resetGame() {
    // this.ngOnInit();
    // this.celulas.forEach((row) => {
    //   row.forEach((celula) => {
    //     celula.state = '';
    //   });
    // });
    // this.celulaComponents.forEach((celulaComponent) => {
    //   if (celulaComponent) {
    //     celulaComponent.updateCell();
    //   }
    // });
  }

  checkIfCorrect(atual: Celula) {
    if (atual.state != '') {
      return;
    }
    this.currentRecord++;
    if (atual.numero == this.numeroCorreto) {
      atual.state = 'correct';
      this.mensagem = 'Acertou';
      this.emojiDistance = '😎';
      this.emojiDirection = '';
      if (this.currentRecord < this.topRecord || this.topRecord == 0) {
          this.topRecord = this.currentRecord;

        localStorage.setItem('currentRecord', this.currentRecord.toString());
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

    if (
      this.numeroCorreto - atual.numero == 1 ||
      this.numeroCorreto - atual.numero == -1
    ) {
      this.emojiDirection = '🤏';
    }

    const celulaComponent = this.celulaComponents.find(
      (c) => c.cell.numero === atual.numero
    );
    if (celulaComponent) {
      celulaComponent.updateCell();
    }
  }
}
