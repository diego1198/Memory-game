import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { cpuUsage } from 'process';

@Component({
  selector: 'app-game',
  templateUrl: './game.page.html',
  styleUrls: ['./game.page.scss'],
})
export class GamePage implements OnInit {
  public col = 0;
  public row = 0;
  public route = '../../assets/images/img';
  public img_hidden = '../../assets/images/memory.gif';
  public ext = '.jpg';
  public matriz = [];

  public visible = true;

  public MaxFichas = this.col * this.row;

  public gImages: any[];

  public cards: any[];

  constructor() {}

  ngOnInit() {
    this.generateArray();
  }

  loadImages() {
    this.MaxFichas = this.col * this.row;
    this.gImages = new Array();
    for (let index = 0; index < this.MaxFichas; index++) {
      this.gImages[index] = new Object();
      this.gImages[index].src = this.route + (index + 1) + this.ext;
    }
  }

  generateCards() {
    this.cards = new Array();
    for (let index = 0; index < this.MaxFichas; index++) {
      this.cards[index] = index;
    }
    let nUno: number, nDos: number, nTemp: number;

    let i = 100;
    while (i--) {
      nUno = this.azar(); //aleatorio para separar las parejas
      nDos = this.azar(); //aleatorio para separar la pareja de la anterior
      if (nDos !== nUno) {
        nTemp = this.cards[nUno];
        this.cards[nUno] = this.cards[nDos];
        this.cards[nDos] = nTemp;
      }
    }
  }

  azar() {
    return Math.floor(Math.random() * this.MaxFichas);
  }

  showImage(row,col,index){
    console.log(row,col, index, this.cards)
    this.matriz[row].cols[col].img_oculta = this.gImages[this.cards[index]].src;
  }

  generateArray() {
    this.loadImages();
    this.generateCards();
    this.matriz = [];
    let i = 0;
    for (let row = 0; row < this.row; row++) {
      let colums = [];
      for (let col = 0; col < this.col; col++) {
        colums.push({
          col,
          img_oculta: this.img_hidden,
          index: i
        });
        i++;
      }
      this.matriz.push({
        cols: colums,
        row,
      });
    }
  }

  selectEasy() {
    this.col = 2;
    this.row = 2;
    this.visible = false;
    this.generateArray();
  }

  selectMedium() {
    this.col = 2;
    this.row = 4;
    this.visible = false;
    this.generateArray();
  }

  selectHard() {
    this.col = 2;
    this.row = 6;
    this.visible = false;
    this.generateArray();
  }

  selectLevel() {
    this.visible = true;
  }
}
