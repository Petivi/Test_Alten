import { EventEmitter, Injectable } from '@angular/core';

import { MenuItem } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class BreadcrumbService {

  constructor() { }

  private breadcrumb: MenuItem[] = [{label: 'Home'}];


  getBreadcrumb(): MenuItem[] {
    return this.breadcrumb;
  }

  setBreadcrumb(arr: MenuItem[]): void {
    this.breadcrumb = [{label: 'Home'}, ...arr];
  }
}
