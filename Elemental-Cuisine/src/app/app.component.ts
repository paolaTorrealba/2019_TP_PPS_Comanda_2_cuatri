import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { timer } from 'rxjs';
import { SmartAudioService } from './services/smart-audio.service';

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
    private smartAudioService: SmartAudioService
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
    });
  }
}
