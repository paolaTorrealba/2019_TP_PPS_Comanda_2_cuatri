import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Product } from 'src/app/classes/product';
import { CameraService } from 'src/app/services/camera.service';
import { ProductService } from 'src/app/services/product.service';
import { NotificationService } from 'src/app/services/notification.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { LoadingService } from 'src/app/services/loading.service';


@Component({
  selector: 'app-modify-product',
  templateUrl: './modify-product.component.html',
  styleUrls: ['./modify-product.component.scss'],
})
export class ModifyProductComponent implements OnInit {
  private currentProduct:Product;
  private id;
  descriptionModel;
  nameModel;
  preparationTimeModel;
  photoModel = "";
  valueModel;

  constructor(
    private cameraService: CameraService,
    private productService: ProductService,
    private loadingService: LoadingService,
    private notificationService: NotificationService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.loadingService.showLoading("Espere..");
    this.id = this.activatedRoute.snapshot.paramMap.get('id')
    this.productService.getProductById(this.id).then(productData => {            
        this.currentProduct = Object.assign(new Product, productData.data());

        this.loadingService.closeLoading();     
        this.descriptionModel=this.currentProduct.description
        this.nameModel=this.currentProduct.name;
        this.preparationTimeModel=this.currentProduct.preparationTime
        this.photoModel = this.currentProduct.photo.toString();
        this.valueModel=this.currentProduct.value;
        
    })
  }

  modify(){    
   this.productService.updateProduct('productos',this.id,{
      'value' : this.valueModel, 'preparationTime': this.preparationTimeModel ,
      'photo' : this.photoModel,'name':this.nameModel,
      'description': this.descriptionModel}).then(() => {
      this.notificationService.presentToast("Producto modificado", "success", "top");
      this.productService.getProductById(this.currentProduct.id.toString()).then(product => {
        this.currentProduct = Object.assign(new Product, product.data());
      })
      this.router.navigateByUrl('/listado/productos');
    });    
  
  }  
 
  takePhoto(){
    this.cameraService.takePhoto('productos', Date.now());
  } 

}
