import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-celula',
  templateUrl: './celula.component.html',
  styleUrl: './celula.component.css'
})
export class CelulaComponent {
  @Input() cell!: Celula;
  ngOnInit() {
    this.updateCell();
  }
  updateCell() {
    switch (this.cell.state) {
      case "correct":
        // this.cell.color = "green";
        // this.cell.fontColor = "white";
        this.cell.fontColor = "green";
        break;
      case "incorrect":
        // this.cell.color = "red";
        // this.cell.fontColor = "white";
        this.cell.fontColor = "red";
        break;
      default:
        // this.cell.color = "white";
        // this.cell.fontColor = "black";
        this.cell.fontColor = "black";
        break;
    }
  }
}
export interface Celula {
  numero: number;
  state: string;
  color: string;
  fontColor: string;
  position: {
    x: number;
    y: number;
  }
}
