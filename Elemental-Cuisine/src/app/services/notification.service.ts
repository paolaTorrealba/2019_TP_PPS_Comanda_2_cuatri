import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(
    private toastController: ToastController,
  ) { }

  async presentToast(message, color, position) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: position,
      color: color
    });
    toast.present();
  }
}
