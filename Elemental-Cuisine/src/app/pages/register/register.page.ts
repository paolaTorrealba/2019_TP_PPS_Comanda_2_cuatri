import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import * as firebase from "firebase";
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { Camera, CameraOptions} from '@ionic-native/camera/ngx';
import { AuthService } from 'src/app/services/auth.service';
import { UserServiceService } from 'src/app/services/user-service.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  firebase = firebase;
  nombre: string;
  apellido: string;
  dni: number;
  foto: string; 
  perfil: string = "cliente registrado"; 
  email: string;
  clave: string;
  clave2: string;
  estado: string = "Pendiente de aprobación";

  constructor(
    public router: Router,
    private userService: UserServiceService,
    private authService: AuthService, 
    private camera: Camera, 
    private scanner: BarcodeScanner, 
    public navCtrl: NavController) {
  }

  ngOnInit() {}

  //El Alta es solo para Cliente
  alta(){
    let data;
    if(this.nombre != undefined && this.foto != undefined && this.email != undefined
      && this.clave != undefined && this.apellido != undefined && this.dni != undefined
      && this.dni.toString().length == 8 && this.clave2 != undefined && this.clave.length >= 6){
        if(this.clave == this.clave2){
          data = {
              'nombre': this.nombre,
              'apellido': this.apellido,
              'dni': this.dni,
              'foto': this.foto,            
              'perfil': 'cliente',
              'estado': this.estado,            
              'email': this.email          
          }  
   
          console.log("guardar usuario: ", data);
    this.userService.guardarUsuario(data).then(response =>{
            //agregar un alert o popup
            //ir a home de Cliente
            this.router.navigate(['/home']);
          });
        }
        else{
          //mostrar un alert
          console.log("las contraseñas no coinciden")
          // this.alert.mostrarErrorLiteral("Las contraseñas son distintas");
        }
    }
    else{
      if(this.nombre == undefined || this.email == undefined || this.clave == undefined 
        ||  this.apellido == undefined ||  this.dni == undefined || this.clave2 == undefined){
          console.log("Hay campos sin rellenar")
        // this.alert.mostrarErrorLiteral("Hay campos sin rellenar");
      }
      else{
        if(this.dni.toString().length < 8 || this.dni.toString().length > 8)
          console.log("El dni debe tener 8 caracteres")
          // this.alert.mostrarErrorLiteral("El dni debe tener 8 caracteres");
        if(this.clave.length < 6)
           console.log("La clave debe tener por lo menos 6 caracteres")
          // this.alert.mostrarErrorLiteral("La clave debe tener por lo menos 6 caracteres");
      }
      if(this.foto == undefined){
        console.log("Falta cargar una foto")
        // this.alert.mostrarErrorLiteral("Falta cargar una foto");
      }
    }
  	
  }

  volver(){
    this.router.navigate(['/login']);
  }

  async abrirCamara() {

    let imageName = this.dni + this.apellido;
    this.foto = imageName; //--> solo para probar asigno esta foto.

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

  escanear(){
    let options = { prompt: "Escaneá el DNI", formats: "PDF_417" };

    this.scanner.scan(options).then(barcodeData => {
      alert(barcodeData.text);
      let contenido = barcodeData.text;
      let array = contenido.split('@');
      this.dni = +array[4];
      if(this.nombre == "" || this.nombre == undefined)
        this.nombre = array[2];
      if(this.apellido == "" || this.apellido == undefined)
        this.apellido = array[1];

    }).catch(err => { 
      console.log('Error', err);
    });
  }

  showAlert() {   
    Swal.fire({
      title: 'Custom width, padding, background.',
      width: 600,
      padding: '3em',
      backdrop: false
    })
  }


}
