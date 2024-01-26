import { Routes } from '@angular/router';
import { ProductsComponent } from './components/products/products.component';
import { ProductsAdminComponent } from './components/products-admin/products-admin.component';

export const routes: Routes = [
    { path: 'products', component: ProductsComponent },
    { path: 'admin/products', component: ProductsAdminComponent },
];
