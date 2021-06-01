import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Storage } from '@capacitor/storage';

@Component({
  selector: 'app-alimentar',
  templateUrl: './alimentar.page.html',
  styleUrls: ['./alimentar.page.scss'],
})
export class AlimentarPage implements OnInit {
  public palabra = {
    palabra: '',
    descripcion: '',
    anagrama: '',
  };

  constructor(public alertController: AlertController, private router: Router) {}

  ngOnInit() {}

  async registrar() {
    const { anagrama, descripcion, palabra } = this.palabra;

    if (anagrama === '' || descripcion === '' || palabra === '') {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Complete los campos',
        buttons: ['ok'],
      });

      await alert.present();
    }

    const { value } = await Storage.get({ key: 'palabras' });
    const palabras: Palabra[] = JSON.parse(value);

    const existePalabra = palabras.find(pal => pal.palabra.toLowerCase() === this.palabra.palabra.toLowerCase());

    if (existePalabra) {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Esa palabra ya se encuentra en el diccionario',
        buttons: ['ok'],
      });

      await alert.present();
      return;
    }


    const nuevo = [...palabras, this.palabra];

    await Storage.set({
      key: 'palabras',
      value: JSON.stringify(nuevo)
    });

    const successAlert = await this.alertController.create({
      header: 'Listo',
      message: 'Palabra agregada',
      buttons: ['ok'],
    });

    await successAlert.present();

    this.router.navigateByUrl('/home');
  }

}

interface Palabra {

    palabra: string;
    descripcion: string;
    anagrama: string;

}
