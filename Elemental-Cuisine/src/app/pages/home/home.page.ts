import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/classes/user';
import { QrscannerService } from 'src/app/services/qrscanner.service';
import { isNullOrUndefined } from 'util';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  currentUser: User;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private qrscannerService: QrscannerService,
    private router: Router
  ) {
    if (isNullOrUndefined(this.authService.getCurrentUser())) {
      this.currentUser = new User();
      this.currentUser.profile = "dueño";
      return;
    }

    this.userService.getUser(this.authService.getCurrentUser().uid).then(user => {
      this.currentUser = Object.assign(new User, user.data());
    })
  }

  showAlert() {
    // Swal.fire('Oops...', 'Something went wrong!', 'error');
    Swal.fire({
      title: 'Custom width, padding, background.',
      width: 600,
      padding: '3em',
      backdrop: false
    })
  }

  addToWaitList() {
    this.qrscannerService.scanQr().then(response => {
      console.log(response);
      if (response == 'listaDeEspera') {
        this.userService.setDocument('listaDeEspera', this.authService.getCurrentUser().uid, {})
        console.log("Agregado a lista de espera");
      }
    });
  }
}
