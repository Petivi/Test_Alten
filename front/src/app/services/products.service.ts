import { Injectable } from '@angular/core';

import { data } from '../../assets/json/products.json';

import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  public tab_products: Array<Product> = [];

  constructor() {
    data.forEach(el => {
      let product = new Product(el.id, el.code, el.name, el.description, el.image, el.price, el.category, el.quantity, el.inventoryStatus, el.rating);
      this.tab_products.push(product);
    });
   }
}
