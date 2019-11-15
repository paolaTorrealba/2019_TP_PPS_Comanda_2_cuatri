import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import * as firebase from "firebase";
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { Camera, CameraOptions} from '@ionic-native/camera/ngx';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from 'src/app/classes/user';
import { QrscannerService } from 'src/app/services/qrscanner.service';

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
    private authService: AuthService, 
    private camera: Camera, 
    private qrscannerService: QrscannerService, 
    private navCtrl: NavController,
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
    this.userService.saveUser(this.user).then(response =>{
      //agregar un alert o popup
      this.router.navigate(['/home']);
    });
  }  	

  async abrirCamara() {

    //let imageName = this.apellido;
    try {

      // let options: CameraOptions = {
      //   quality: 50,
      //   targetHeight: 600,
      //   targetWidth: 600,
      //   destinationType: this.camera.DestinationType.DATA_URL,
      //   encodingType: this.camera.EncodingType.JPEG,
      //   mediaType: this.camera.MediaType.PICTURE
      // };

      // let result = await this.camera.getPicture(options);
      // let image = `data:image/jpeg;base64,${result}`;
      // //guardo en Firebase Storage
      // let pictures = this.firebase.storage().ref(`clientes/${imageName}`);
      // //tomo url de foto en Firebase Storage
      // pictures.putString(image, "data_url").then(() => {
      //   pictures.getDownloadURL().then((url) => {
      //      this.foto = url;
      //      console.log("Foto guardada con éxito")
      //   // this.alert.mostrarMensaje("Foto guardada con éxito");
      //   });
        
      // });

    } catch (error) {

      alert(error);
    }
  }

  scan(){
    let dniData = this.qrscannerService.scanDni();
    alert(dniData);
  }


}
