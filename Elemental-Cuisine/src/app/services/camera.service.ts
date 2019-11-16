import { Injectable } from '@angular/core';
import { Camera, CameraOptions} from '@ionic-native/camera/ngx';
import * as firebase from "firebase";

@Injectable({
  providedIn: 'root'
})
export class CameraService {

  constructor(
    private camera: Camera, 
  ) { }

  async takePhoto() {

    let imageName = "foto";
    try {
      let options: CameraOptions = {
        quality: 50,
        targetHeight: 600,
        targetWidth: 600,
        destinationType: this.camera.DestinationType.DATA_URL,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE
      };

        let result = await this.camera.getPicture(options);
        let image = `data:image/jpeg;base64,${result}`;
        //guardo en Firebase Storage
        let pictures = firebase.storage().ref(`clientes/${imageName}`);
        //tomo url de foto en Firebase Storage
        pictures.putString(image, "data_url").then(() => {
          pictures.getDownloadURL().then((url) => {
          console.log("Foto guardada con éxito")
          alert("Foto guardada con éxito");
        });  
      });
    } catch (error) {

      alert(error);
    }
  }
}
