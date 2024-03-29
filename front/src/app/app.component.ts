import { Component } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { MenuItem } from 'primeng/api';

import { BreadcrumbService } from './services/breadcrumb.service';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [RouterOutlet, RouterModule, ButtonModule, BreadcrumbModule]
})
export class AppComponent {
  title = 'front';
  protected breadcrumb: MenuItem[] = [];

  constructor(private _breadcrumbService: BreadcrumbService) {}


  ngAfterViewChecked(){
    this.breadcrumb = this._breadcrumbService.getBreadcrumb();
  }

}
