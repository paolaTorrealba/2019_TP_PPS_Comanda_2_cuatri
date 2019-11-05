import { Component, OnInit } from '@angular/core';
import { ImagePicker, ImagePickerOptions } from '@ionic-native/image-picker/ngx';
import { File } from '@ionic-native/file/ngx';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.page.html',
  styleUrls: ['./product-add.page.scss'],
})
export class ProductAddPage implements OnInit {

  images: any = [];

  constructor(public imagePicker: ImagePicker, public file: File) { }

  ngOnInit() {
  }

  PickMultipleImages() {
    var options: ImagePickerOptions = {
      maximumImagesCount: 3,
      width: 100,
      height: 100
    }

    this.imagePicker.getPictures(options).then((results) => {
      for (var interval = 0; interval < results.lenght; interval++) {
        let filename = results[interval].substring(results[interval].lastIndexOf('/') + 1);
        let path = results[interval].substring(0, results[interval].lastIndexOf('/') + 1);
        this.file.readAsDataURL(path, filename).then((base64string) => {
          this.images.push(base64string);
        })
      }
    });
  }
}
