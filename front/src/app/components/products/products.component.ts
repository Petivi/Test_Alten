import { Component } from '@angular/core';
import { TableModule } from 'primeng/table';

import { ProductsService } from '../../services/products.service';
import { Product } from '../../models/product';


@Component({
  selector: 'app-products',
  standalone: true,
  imports: [TableModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {
  protected tab_products: Array<Product> = [];

  constructor(
    private _productsService: ProductsService,
  ){}

  ngOnInit(){
    this.tab_products = this._productsService.tab_products;
  }

}
