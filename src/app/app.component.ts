import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Storage } from '@capacitor/storage';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private http: HttpClient) {}

  async ngOnInit() {
    this.http.get('assets/palabras.json').subscribe(async (res: any[]) => {
      const {value} = await Storage.get({key: 'palabras'});
      if (!value) {
        await Storage.set({
          key: 'palabras',
          value: JSON.stringify(res),
        });
      }
    });

  }
}
