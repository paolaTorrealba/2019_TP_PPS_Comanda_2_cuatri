import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/classes/user';
import { CameraService } from 'src/app/services/camera.service';
import { UserService } from 'src/app/services/user.service';
import { NotificationService } from 'src/app/services/notification.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-modify-user',
  templateUrl: './modify-user.component.html',
  styleUrls: ['./modify-user.component.scss'],
})
export class ModifyUserComponent implements OnInit {
  private currentUser:User;
  private id;
  cuilModel;
  dniModel;
  nameModel;
  profileModel;
  statusModel;
  surnameModel;
  photoModel="";

  constructor(
    private cameraService: CameraService,
    private userService: UserService,
    private loadingService: LoadingService,
    private notificationService: NotificationService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.loadingService.showLoading("Espere..");
    this.id = this.activatedRoute.snapshot.paramMap.get('id')
    this.userService.getUserById(this.id).then(productData => {            
        this.currentUser = Object.assign(new User, productData.data());

        this.loadingService.closeLoading();          
        this.cuilModel=this.currentUser.cuil;
        this.dniModel=this.currentUser.dni;
        this.nameModel=this.currentUser.name;
        this.profileModel=this.currentUser.profile;
        this.photoModel=this.currentUser.photo;
        this.statusModel=this.currentUser.status;
        this.surnameModel=this.currentUser.surname;
        
    })
  }

  modify(){    
   this.userService.updateUser('usuarios',this.id,{
      'cuil' : this.cuilModel,'profile': this.profileModel ,
      'photo' : this.photoModel,'name':this.nameModel,
      'dniModel': this.dniModel, 'status':this.statusModel,'surname':this.surnameModel}).then(() => {
      this.notificationService.presentToast("usuario modificado", "success", "top");
      this.userService.getUserById(this.currentUser.id.toString()).then(product => {
        this.currentUser = Object.assign(new User, product.data());
      })
      this.router.navigateByUrl('/listado/usuarios');
    });    
  
  }  
 
  takePhoto(){
    this.cameraService.takePhoto('usuarios', Date.now());
  } 

}
