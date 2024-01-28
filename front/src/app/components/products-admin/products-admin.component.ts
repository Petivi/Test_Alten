import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TableModule, Table } from 'primeng/table';
import { InputTextModule  } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DropdownModule } from 'primeng/dropdown';
import { TagModule } from 'primeng/tag';
import { MultiSelectModule } from 'primeng/multiselect';
import { ToolbarModule } from 'primeng/toolbar';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogModule } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { InputNumberModule } from 'primeng/inputnumber';
import { RadioButtonModule } from 'primeng/radiobutton';
import { RatingModule } from 'primeng/rating';

import { ProductsService } from '../../services/products.service';
import { BreadcrumbService } from '../../services/breadcrumb.service';
import { Product } from '../../models/product';

@Component({
  selector: 'app-products-admin',
  standalone: true,
  imports: [CommonModule, TableModule, InputTextModule, InputTextareaModule, DropdownModule, TagModule, MultiSelectModule, FormsModule, ToolbarModule, DialogModule, ConfirmDialogModule, InputNumberModule, RadioButtonModule, RatingModule],
  providers:[ConfirmationService, MessageService],
  templateUrl: './products-admin.component.html',
  styleUrl: './products-admin.component.css'
})
export class ProductsAdminComponent {
  @ViewChild('dt') dt: Table | undefined;

  protected new_product: Product = new Product(0, "", "", "", "", 0, "", 0, "", 0);
  protected selectedProducts: Array<Product> = [];
  protected submitted: boolean = false;
  protected productDialog: boolean = false;
  protected statuses: any[] = [];

  constructor(
    private _breadcrumbService: BreadcrumbService,
    protected _productsService: ProductsService,
    private _confirmationService: ConfirmationService,
    private _messageService: MessageService,
  ){}

  ngOnInit(){
    this.statuses = [
      {label: 'INSTOCK', value: 'INSTOCK'},
      {label: 'LOWSTOCK', value: 'LOWSTOCK'},
      {label: 'OUTOFSTOCK', value: 'OUTOFSTOCK'}
    ];
    this._breadcrumbService.setBreadcrumb([{label: 'Admin'}])
  }

  resetNewProduct(){
    this.new_product = new Product(0, "", "", "", "", 0, "", 0, "", 0);
  }

  applyFilterGlobal(event: any, stringVal: any) { 
    this.dt?.filterGlobal((event.target as HTMLInputElement).value, stringVal); 
  }


  openNew() {
    this.resetNewProduct();
    this.submitted = false;
    this.productDialog = true;
  }

  deleteSelectedProducts() {
    this._confirmationService.confirm({
        message: 'Are you sure you want to delete the selected products?',
        header: 'Confirm',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
            this._productsService.tab_products = this._productsService.tab_products.filter(val => !this.selectedProducts.includes(val));
            this.selectedProducts = [];
        }
    });
  }

  deleteProduct(product: Product) {
    this._confirmationService.confirm({
        message: 'Are you sure you want to delete ' + product.name + '?',
        header: 'Confirm',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
            this._productsService.tab_products = this._productsService.tab_products.filter(val => val.id !== product.id);
            this.resetNewProduct();
            this._messageService.add({severity:'success', summary: 'Successful', detail: 'Product Deleted', life: 3000});
        }
    });
  }

  editProduct(product: Product) {
    this.new_product = {...product};
    this.productDialog = true;
  }

  hideDialog() {
    this.productDialog = false;
    this.submitted = false;
  }

  saveProduct() {
    this.submitted = true;

    if (this.new_product.name.trim()) {
      if (this.new_product.id) {
        this._productsService.tab_products[this.findIndexById(this.new_product.id)] = this.new_product;
        this._messageService.add({severity:'success', summary: 'Successful', detail: 'Product Updated', life: 3000});
      }else{
        this.new_product.id = this.createId();
        this.new_product.image = 'product-placeholder.svg';
        this._productsService.tab_products.push(this.new_product);
        this._messageService.add({severity:'success', summary: 'Successful', detail: 'Product Created', life: 3000});
      }

      this.productDialog = false;
      this.resetNewProduct();
    }
  }

  findIndexById(id: number): number {
    let index = -1;
    for (let i = 0; i < this._productsService.tab_products.length; i++) {
        if (this._productsService.tab_products[i].id === id) {
            index = i;
            break;
        }
    }

    return index;
}

  createId(): number {
    return new Date().getTime(); // not secure at all (but at least unique)
  }
}
