import { Component, ViewChild } from '@angular/core';
import { TableModule, Table } from 'primeng/table';
import { InputTextModule  } from 'primeng/inputtext';

import { ProductsService } from '../../services/products.service';
import { Product } from '../../models/product';


@Component({
  selector: 'app-products',
  standalone: true,
  imports: [TableModule, InputTextModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {
  @ViewChild('dt1') dt: Table | undefined;
  protected tab_products: Array<Product> = [];

  constructor(
    private _productsService: ProductsService,
  ){}

  ngOnInit(){
    this.tab_products = this._productsService.tab_products;
  }


  applyFilterGlobal(event: any, stringVal: any) { 
    this.dt?.filterGlobal((event.target as HTMLInputElement).value, stringVal); 
  }

}
