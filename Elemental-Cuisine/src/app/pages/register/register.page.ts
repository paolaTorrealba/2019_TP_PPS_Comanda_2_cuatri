import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from 'src/app/classes/user';
import { QrscannerService } from 'src/app/services/qrscanner.service';
import { CameraService } from 'src/app/services/camera.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  private user:User;
  private object;

  constructor(
    private router: Router,
    private userService: UserService,
    private cameraService: CameraService,
    private qrscannerService: QrscannerService, 
    private activatedRoute: ActivatedRoute
  ) {
      this.user = new User();
  }

  ngOnInit() {
    this.object = this.activatedRoute.snapshot.paramMap.get('object');
  }

  //El Alta es solo para Cliente
  alta(){ 
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
