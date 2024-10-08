import { Component, NgModule, QueryList, ViewChildren } from '@angular/core';
import { CelulaComponent, Celula } from '../celula/celula.component';
import { placarItem } from '../placar-item/placar-item.component';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrl: './game.component.css',
})
export class GameComponent {
  constructor(private http: HttpClient) {}
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
  public nome = '';
  public encontrado = false;
  public placarItens: placarItem[] = [];

  @ViewChildren(CelulaComponent) celulaComponents!: QueryList<CelulaComponent>;

  updateNome() {
    localStorage.setItem('nome', this.nome);
  }

  resetGame() {
    this.celulas = [];
    this.ngOnInit();
  }

  buscarPlacar() {
    let url = '/api/Game/Placar';
    this.http.get(url, { responseType: 'text' }).subscribe({
      next: (res) => {
        let placarItensRes: placarItem[] = JSON.parse(res);
        this.placarItens = placarItensRes;
      },
      error: (err) => {
        console.log('Error:', err);
      },
    });
  }

  ngOnInit() {
    localStorage.setItem('token', '');
    this.nome = localStorage.getItem('nome') ?? '';
    this.currentRecord = 0;
    this.emojiDistance = '🙂';
    this.emojiDirection = '';
    this.encontrado = false;
    this.buscarPlacar();
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

  checkIfCorrect(atual: Celula) {
    if(this.encontrado) return;
    if (atual.state != '') return;
    atual.state = 'unsure';
    let req: CheckIfCorrectRequest = {
      numero: atual.numero,
      token: localStorage.getItem('token') ?? '',
      nome: this.nome,
    };

    let url = '/api/Game/CheckIfCorrect';
    this.http.post(url, req, { responseType: 'text' }).subscribe({
      next: (res) => {
        let result: CheckIfCorrectResult = JSON.parse(res);
        localStorage.setItem('token', result.token);
        atual.state = result.state;
        this.mensagem = result.mensagem;
        this.emojiDistance = result.emojiDistance;
        this.emojiDirection = result.emojiDirection;
        this.currentRecord = result.currentRecord;
        const celulaComponent = this.celulaComponents.find(
          (c) => c.cell.numero === atual.numero
        );
        if (celulaComponent) {
          celulaComponent.updateCell();
        }
        if (result.state == 'correct') {
            this.encontrado = true;
          this.buscarPlacar();

          if (this.currentRecord < this.topRecord || this.topRecord == 0) {
            this.topRecord = this.currentRecord;
            localStorage.setItem(
              'currentRecord',
              this.currentRecord.toString()
            );
          }
        }
      },
      error: (err) => {
        console.log('Error:', err);
      },
    });
  }
}
export interface CheckIfCorrectRequest {
  token: string;
  numero: number;
  nome: string;
}

export interface CheckIfCorrectResult {
  token: string;
  state: string;
  mensagem: string;
  emojiDistance: string;
  emojiDirection: string;
  currentRecord: number;
  // topRecord: number;
  nome: string;
}
