import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/classes/user';
import { QrscannerService } from 'src/app/services/qrscanner.service';
import { isNullOrUndefined } from 'util';
import { NotificationService } from 'src/app/services/notification.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-client-home',
  templateUrl: './client-home.component.html',
  styleUrls: ['./client-home.component.scss'],
})
export class ClientHomeComponent implements OnInit {

  currentUser: User;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private qrscannerService: QrscannerService,
    private notificationService: NotificationService,
    private router: Router
  ) {
      let user = this.authService.getCurrentUser();
      if (isNullOrUndefined(user)) {
        this.router.navigateByUrl("/login");
      }
      this.userService.getUser(user.uid).then(userData => {
        this.currentUser = Object.assign(new User, userData.data());
      })
  }

  ngOnInit(){}

  addToWaitList() {
    this.qrscannerService.scanQr().then(response => {
      if (response == 'listaDeEspera') {
        this.userService.setDocument('listaDeEspera', this.currentUser.id.toString(), { 'date' : Date.now(), 'name': this.currentUser.name });
        this.userService.update('usuarios', this.currentUser.id, { 'status': 'enEspera' }).then(() => {
          this.notificationService.presentToast("Agregado a lista de espera", "success", "top");
          this.userService.getUser(this.currentUser.id.toString()).then(user => {
            this.currentUser = Object.assign(new User, user.data());
          })
        });
      }
    });
  }

  removeFromWaitList() {
    this.userService.deleteDocument('listaDeEspera', this.currentUser.id.toString());
    this.userService.update('usuarios', this.currentUser.id, { 'status': 'sinAtender' }).then(() => {
      this.notificationService.presentToast("Eliminado de la Lista de Espera", "warning", "top");
      this.router.navigateByUrl("/login");
    })
  }

  logout(){
    this.authService.logOut();
  }

  delivery(){

  }

  showPolls(){

  }

  book(){
    
  }
}
