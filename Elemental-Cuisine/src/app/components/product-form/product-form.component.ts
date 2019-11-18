import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/classes/product';
import { CameraService } from 'src/app/services/camera.service';
import { ProductService } from 'src/app/services/product.service';
import { QrscannerService } from 'src/app/services/qrscanner.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss'],
})
export class ProductFormComponent implements OnInit {

  private product:Product;

  constructor(
    private cameraService: CameraService,
    private productService: ProductService,
    private qrscannerService: QrscannerService,
    private notificationService: NotificationService
  ) { 
    this.product = new Product();
  }

  ngOnInit() {}

  register(){ 
    this.productService.saveProduct(this.product).then(() => {
      this.notificationService.presentToast("Producto creado", "success", "top");
    });
  }  

  takePhoto(){
    //Cambiar nombre de la foto (segundo parametro)
    this.cameraService.takePhoto('productos', Date.now());
  }

  scan(){
    let data = this.qrscannerService.scanDni();
    alert(data);
  }
}
