import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/classes/product';
import { NotificationService } from 'src/app/services/notification.service';
import { Router } from '@angular/router';
//import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.page.html',
  styleUrls: ['./product-list.page.scss'],
})
export class ProductListPage implements OnInit {

  private products: Array<Product>;

  constructor(
    private productService: ProductService,
    private router: Router,
    //public popoverController: PopoverController
  ) { 
    this.productService.getAllProducts('productos').subscribe(products => {
      this.products = new Array<Product>();
      products.forEach(document => {
        const product = document.payload.doc.data() as Product;
        product.id = document.payload.doc.id;
        this.products.push(product); 
      })
    });
  }

  ngOnInit() {
  }

  deleteProduct(event, productId){
    event.stopPropagation();
    this.productService.deleteProduct(productId);
  }

  modifyProduct(event,productId){
    event.stopPropagation();
  this.router.navigateByUrl('/modificar/producto/'+ productId);
  }
  
  /*async showDetails(ev){
    const popover = await this.popoverController.create({
      component: "",
      event: ev,
      translucent: true
    });
    return await popover.present();
  }*/
}
