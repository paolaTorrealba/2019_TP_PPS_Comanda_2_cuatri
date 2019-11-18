import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { User } from 'src/app/classes/user';
import { QrscannerService } from 'src/app/services/qrscanner.service';
import { CameraService } from 'src/app/services/camera.service';

@Component({
  selector: 'app-client-form',
  templateUrl: './client-form.component.html',
  styleUrls: ['./client-form.component.scss'],
})
export class ClientFormComponent implements OnInit {

  private user:User;

  constructor(
    private router: Router,
    private userService: UserService,
    private cameraService: CameraService,
    private qrscannerService: QrscannerService
  ) { 
    this.user = new User();
  }

  ngOnInit() {}

  register(){ 
    this.user.profile = "cliente";
    this.user.status = "sinAtender"
    this.userService.saveUser(this.user).then(response =>{
      //agregar un alert o popup
      this.router.navigate(['/home']);
    });
  }  

  takePhoto(){
    this.cameraService.takePhoto();
  }

  scan(){
    let dniData = this.qrscannerService.scanDni();
    alert(dniData);
  }

}
