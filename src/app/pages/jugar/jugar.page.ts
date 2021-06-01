import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Storage } from '@capacitor/storage';

@Component({
  selector: 'app-jugar',
  templateUrl: './jugar.page.html',
  styleUrls: ['./jugar.page.scss'],
})
export class JugarPage implements OnInit {
  public palabraActual: {
    palabra: string;
    descripcion: string;
    anagrama: string;
  };

  public respuesta: string;
  public intentos = 0;
  public puntaje = 0;

  constructor(
    private http: HttpClient,
    public alertController: AlertController,
    private router: Router
  ) {}

  ngOnInit() {
    this.getPalabra();
  }

  reset() {
    this.intentos = 0;
    this.puntaje = 0;
  }

  async getPalabra() {
    const { value } = await Storage.get({ key: 'palabras' });
    const res = JSON.parse(value);
    this.palabraActual = res[Math.floor(Math.random() * res.length)];
    console.log(this.palabraActual);
    this.respuesta = '';
  }

  async comprobarRespuesta() {
    if (
      this.respuesta &&
      this.respuesta.trim().toLowerCase() ===
        this.palabraActual.anagrama.toLocaleLowerCase()
    ) {
      this.puntaje += 5;
      const alert = await this.alertController.create({
        header: 'Correcto',
        message: `Tu puntaje es ${this.puntaje}`,
        buttons: ['OK'],
      });
      await alert.present();
      this.getPalabra();
    } else {
      this.puntaje -= 2;
      this.puntaje = this.puntaje > 0 ? this.puntaje : 0;
      this.intentos++;

      if (this.intentos === 3) {
        const alert = await this.alertController.create({
          header: 'Se acabo!',
          subHeader: `Intento: ${this.intentos}`,
          message: `El anagrama correcto era ${this.palabraActual.anagrama}`,
          buttons: ['OK'],
        });
        await alert.present();
        this.reset();
        this.router.navigateByUrl('/home');
      } else {
        const alert = await this.alertController.create({
          header: 'Fallaste!',
          subHeader: `Intento: ${this.intentos}`,
          message: `Tu puntaje es ${this.puntaje}`,
          buttons: ['OK'],
        });
        await alert.present();
      }
    }
  }
}
