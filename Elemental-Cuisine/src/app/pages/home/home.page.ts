import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/classes/user';
import { QrscannerService } from 'src/app/services/qrscanner.service';

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
    private qrscannerService: QrscannerService
  ) { 
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

  scan(){
    this.qrscannerService.scanQr();
  }
}
