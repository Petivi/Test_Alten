import { Component } from '@angular/core';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [TableModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {
  protected products: Array<any> = [
    {
      code: "Oui",
      name: "Ouii",
      category: "Ouiii",
      quantity: "Ouiiiii"
    }
  ];
}
