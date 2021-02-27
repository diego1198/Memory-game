import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-game',
  templateUrl: './game.page.html',
  styleUrls: ['./game.page.scss'],
})
export class GamePage implements OnInit {
  public col = 0;
  public row = 0;
  public route = '../../assets/images/img';
  public imgHidden = '../../assets/images/memory.gif';
  public ext = '.jpg';
  public matriz = [];

  public visible = true;

  public MaxFichas = this.col * this.row;

  public gImages: any[];

  public cards: any[];

  public cardPulsar = new Array(-1, -1);

  public intents = 0;

  public hits = 0;

  public pause = false;

  public startGame = false;

  public timesSeeCards = 3;

  constructor(private alertController: AlertController) {}

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

  showImage(row, col, index) {
    if (this.startGame) {
      if (this.matriz[row].cols[col].img_oculta === this.imgHidden) {
        this.matriz[row].cols[col].img_oculta = this.gImages[
          this.cards[index]
        ].src;
        if (this.cardPulsar[0] === -1) {
          this.cardPulsar[0] = index;
        } else {
          this.cardPulsar[1] = index;
        }
      }
      this.check();
    } else {
      this.presentAlert(
        'Recordatorio',
        'Primero debes iniciar el juego',
        'Pulsa en el botón iniciar'
      );
    }
  }

  check() {
    if (this.pause || this.cardPulsar[1] === -1) {
      return;
    }

    this.intents++;
    console.log(
      this.onlyOdd(this.cards[this.cardPulsar[0]]),
      this.onlyOdd(this.cardPulsar[1])
    );
    if (
      this.onlyOdd(this.cards[this.cardPulsar[0]]) ===
      this.onlyOdd(this.cards[this.cardPulsar[1]])
    ) {
      console.log('acerto');
      this.hits++;
      if (this.hits * 2 === this.MaxFichas) {
        this.presentAlertConfirm();
      }
      this.cardPulsar[0] = -1;
      this.cardPulsar[1] = -1;
    } else {
      this.pause = true;
      setTimeout(() => {
        this.restartPairCard();
      }, 1000);
    }
  }

  restartPairCard() {
    this.pause = false;
    for (let i = 0; i < this.matriz.length; i++) {
      for (let j = 0; j < this.matriz[i].cols.length; j++) {
        if (
          this.matriz[i].cols[j].index === this.cardPulsar[0] ||
          this.matriz[i].cols[j].index === this.cardPulsar[1]
        ) {
          this.matriz[i].cols[j].img_oculta = this.imgHidden;
        }
      }
    }

    this.cardPulsar[0] = -1;
    this.cardPulsar[1] = -1;
  }

  onlyOdd(n) {
    return n % 2 === 0 ? n : n - 1;
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
          img_oculta: this.imgHidden,
          index: i,
        });
        i++;
      }
      this.matriz.push({
        cols: colums,
        row,
      });
    }
  }

  start() {
    this.startGame = true;
  }

  seeCards() {
    if (this.timesSeeCards > 0) {
      let k = 0;
      for (let i = 0; i < this.matriz.length; i++) {
        for (let j = 0; j < this.matriz[i].cols.length; j++) {
          this.matriz[i].cols[j].img_oculta = this.gImages[this.cards[k]].src;
          k++;
        }
      }

      setTimeout(() => {
        for (let i = 0; i < this.matriz.length; i++) {
          for (let j = 0; j < this.matriz[i].cols.length; j++) {
            this.matriz[i].cols[j].img_oculta = this.imgHidden;
          }
        }
      }, 2000);

      this.timesSeeCards--;
    } else {
      this.presentAlert(
        'Alerta',
        'Ya has agotado tus vistas al tablero',
        'Solo tienes 3 vistazos'
      );
    }
  }

  selectEasy() {
    this.col = 3;
    this.row = 4;
    this.intents = 0;
    this.hits = 0;
    this.visible = false;
    this.generateArray();
  }

  selectMedium() {
    this.col = 5;
    this.row = 4;
    this.intents = 0;
    this.hits = 0;
    this.visible = false;
    this.generateArray();
  }

  selectHard() {
    this.col = 4;
    this.row = 5;
    this.intents = 0;
    this.hits = 0;
    this.visible = false;
    this.generateArray();
  }

  selectLevel() {
    this.visible = true;
  }

  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Juego completado!',
      message: '<strong>Felicidades!!</strong>!!!',
      buttons: [
        {
          text: 'Terminar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          },
        },
        {
          text: 'Volver',
          handler: () => {
            this.selectLevel();
          },
        },
      ],
    });

    await alert.present();
  }

  async presentAlert(header, sub, message) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: header,
      subHeader: sub,
      message: message,
      buttons: ['OK'],
    });

    await alert.present();
  }
}
