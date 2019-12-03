import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { timer } from 'rxjs';
import { SmartAudioService } from './services/smart-audio.service';
import { FCM, NotificationData } from '@ionic-native/fcm/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {

  showSplash: Boolean = false;

  constructor(
    private platform: Platform,
    private statusBar: StatusBar,
    private smartAudioService: SmartAudioService,
    private fcm: FCM
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      //this.smartAudioService.preload('horizontal', 'assets/sounds/horizontal.mp3');
      timer(5000).subscribe( () => {
        this.showSplash = false;
      });

      this.fcm.getToken().then((token:string) => {
        console.log("Token: " + token);
      }).catch(error => {
        console.log("Error de Token: " + error);
      });

      //Validar si hace falta
      this.fcm.onTokenRefresh().subscribe((token:string) => {
        console.log("Actualización de Token: " + token);
      });

      this.fcm.onNotification().subscribe(data => {
        if(data.wasTapped){
          console.log("Segundo plano: " + JSON.stringify(data))
        }
        //Aplicación en primer plano
        else{
          console.log("Primer plano: " + JSON.stringify(data))
        }
      }, error => {
        console.log("Error de Token: " + error);
      })
    });
  }
}
