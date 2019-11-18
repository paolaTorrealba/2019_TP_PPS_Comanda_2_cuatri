import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/classes/product';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.page.html',
  styleUrls: ['./product-list.page.scss'],
})
export class ProductListPage implements OnInit {

  private products: Array<Product>;

  constructor(
    private productService: ProductService
  ) { 
    this.productService.getAllProducts('productos').subscribe(products => {
      this.products = new Array<Product>();
      products.forEach((product:Product) => {
        this.products.push(product);
      })
    });
  }

  ngOnInit() {
  }

  /*editarProducto(event) {
    event.stopPropagation();
  }*/

  deleteProduct(product){

  }

  modifyProduct(product){
    
  }
}
