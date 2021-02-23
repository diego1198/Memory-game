import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-game',
  templateUrl: './game.page.html',
  styleUrls: ['./game.page.scss'],
})
export class GamePage implements OnInit {

  public col = 0;
  public row = 0;

  public matriz = [];

  public visible = true;

  constructor() { }

  ngOnInit() {
    this.generateArray();
  }

  generateArray(){
    for (let row = 0; row < this.row; row++) {
      let colums = [];
      for (let col = 0; col < this.col; col++) {
        colums.push(col + 1);
      }
      this.matriz.push({
        cols: colums,
        row: row + 1
      });
    }
  }

  selectEasy(){
    this.col = 2;
    this.row = 2;
    this.visible = false;
    this.generateArray();
  }

  selectMedium(){
    this.col = 2;
    this.row = 4;
    this.visible = false;
    this.generateArray();
  }

  selectHard(){
    this.col = 2;
    this.row = 6;
    this.visible = false;
    this.generateArray();
  }

  selectLevel(){
    this.visible= true;
  }
}
