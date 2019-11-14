import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import * as firebase from "firebase";
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { Camera, CameraOptions} from '@ionic-native/camera/ngx';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { User } from 'src/app/classes/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  user:User;

  constructor(
    public router: Router,
    private userService: UserService,
    private authService: AuthService, 
    private camera: Camera, 
    private scanner: BarcodeScanner, 
    public navCtrl: NavController) {
      this.user = new User();
  }

  ngOnInit() {}

  //El Alta es solo para Cliente
  alta(){ 
    this.user.profile = "cliente";
    this.userService.saveUser(this.user).then(response =>{
      //agregar un alert o popup
      this.router.navigate(['/home']);
    });
  }  	

  returnToLogin(){
    this.router.navigate(['/login']);
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
    let options = { prompt: "Escaneá el DNI", formats: "PDF_417" };

    this.scanner.scan(options).then(barcodeData => {
      alert(barcodeData.text);
      let contenido = barcodeData.text;
      let array = contenido.split('@');
    }).catch(err => { 
      console.log('Error', err);
    });
  }

}
