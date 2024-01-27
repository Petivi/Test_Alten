import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TableModule, Table } from 'primeng/table';
import { InputTextModule  } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { TagModule } from 'primeng/tag';
import { MultiSelectModule } from 'primeng/multiselect';

import { ProductsService } from '../../services/products.service';
import { Product } from '../../models/product';

@Component({
  selector: 'app-products-admin',
  standalone: true,
  imports: [CommonModule, TableModule, InputTextModule, DropdownModule, TagModule, MultiSelectModule, FormsModule],
  templateUrl: './products-admin.component.html',
  styleUrl: './products-admin.component.css'
})
export class ProductsAdminComponent {
  @ViewChild('dt') dt: Table | undefined;
  protected tab_products: Array<Product> = [];
  protected tab_products2: Array<Product> = [];
  clonedProducts: { [s: string]: Product; } = {};

  constructor(
    private _productsService: ProductsService,
  ){}

  ngOnInit(){
    this.tab_products = this._productsService.tab_products;
    this.tab_products2 = this._productsService.tab_products;
  }

  applyFilterGlobal(event: any, stringVal: any) { 
    this.dt?.filterGlobal((event.target as HTMLInputElement).value, stringVal); 
  }


  onRowEditInit(product: Product) {
    this.clonedProducts[product.id] = {...product};
  }

  onRowEditSave(product: Product) {
    delete this.clonedProducts[product.id];
  } 
  
  onRowEditCancel(product: Product, index: number) {
    this.tab_products2[index] = this.clonedProducts[product.id];
    delete this.clonedProducts[product.id];
  }
}
