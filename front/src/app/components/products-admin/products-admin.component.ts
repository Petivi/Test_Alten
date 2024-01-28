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
  protected tab_products: Array<Product> = [];
  protected tab_products2: Array<Product> = [];
  protected clonedProducts: { [s: string]: Product; } = {};

  protected new_product: any = {};
  protected selectedProducts: Array<Product> = [];
  protected submitted: boolean = false;
  protected productDialog: boolean = false;
  protected statuses: any[] = [];

  constructor(
    private _productsService: ProductsService,
    private _confirmationService: ConfirmationService,
    private _messageService: MessageService,
  ){}

  ngOnInit(){
    this.tab_products = this._productsService.tab_products;
    this.tab_products2 = this._productsService.tab_products;

    this.statuses = [
      {label: 'INSTOCK', value: 'instock'},
      {label: 'LOWSTOCK', value: 'lowstock'},
      {label: 'OUTOFSTOCK', value: 'outofstock'}
  ];
  }

  applyFilterGlobal(event: any, stringVal: any) { 
    this.dt?.filterGlobal((event.target as HTMLInputElement).value, stringVal); 
  }


  openNew() {
    this.new_product = {};
    this.submitted = false;
    this.productDialog = true;
  }

  deleteSelectedProducts() {
    this._confirmationService.confirm({
        message: 'Are you sure you want to delete the selected products?',
        header: 'Confirm',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
            this.tab_products = this.tab_products.filter(val => !this.selectedProducts.includes(val));
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
            this.tab_products = this.tab_products.filter(val => val.id !== product.id);
            this.new_product = {};
            this._messageService.add({severity:'success', summary: 'Successful', detail: 'Product Deleted', life: 3000});
        }
    });
  }

  hideDialog() {
    this.productDialog = false;
    this.submitted = false;
  }

  saveProduct() {
    this.submitted = true;

    if (this.new_product.name.trim()) {
        this.new_product.id = this.createId();
        this.new_product.image = 'product-placeholder.svg';
        this.tab_products.push(this.new_product);
        this._messageService.add({severity:'success', summary: 'Successful', detail: 'Product Created', life: 3000});

        this.tab_products = [...this.tab_products];
        this.productDialog = false;
        this.new_product = {};
    }
  }


  createId(): string {
    let id = '';
    var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for ( var i = 0; i < 5; i++ ) {
        id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
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
