import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { DataViewModule } from "primeng/dataview";
import { InputTextModule  } from 'primeng/inputtext';
import { RatingModule } from 'primeng/rating';
import { TagModule } from 'primeng/tag';
import { SelectItem } from 'primeng/api';
import { DropdownModule } from 'primeng/dropdown';

import { ProductsService } from '../../services/products.service';
import { Product } from '../../models/product';


@Component({
  selector: 'app-products',
  standalone: true,
  imports: [DataViewModule, RatingModule, FormsModule, DropdownModule, TagModule, InputTextModule, CommonModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {
  @ViewChild('dv') dv: any | undefined;
  protected tab_products: Array<Product> = [];
  sortOptions!: SelectItem[];
  sortOrder!: number;
  sortField!: string;

  constructor(
    private _productsService: ProductsService,
  ){}

  ngOnInit(){
    this.tab_products = this._productsService.tab_products;

    this.sortOptions = [
      { label: 'Price High to Low', value: '!price' },
      { label: 'Price Low to High', value: 'price' }
  ];
  }


  applyFilterGlobal(event: any, stringVal: any) { 
    this.dv?.filter((event.target as HTMLInputElement).value, stringVal); 
  }

  onSortChange(event: any) {
    let value = event.value;

    if (value.indexOf('!') === 0) {
        this.sortOrder = -1;
        this.sortField = value.substring(1, value.length);
    } else {
        this.sortOrder = 1;
        this.sortField = value;
    }
}

  getSeverity(product: Product) {
    switch (product.inventoryStatus) {
        case 'INSTOCK':
            return 'success';

        case 'LOWSTOCK':
            return 'warning';

        case 'OUTOFSTOCK':
            return 'danger';

        default:
            return null;
    }
};

}
