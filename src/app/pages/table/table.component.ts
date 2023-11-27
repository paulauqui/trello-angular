import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CdkTableModule } from '@angular/cdk/table';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NavbarComponent } from './../../pages/navbar/navbar.component';
import { Product } from './../../models/product.model';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule, CdkTableModule, NavbarComponent, HttpClientModule],
  templateUrl: './table.component.html',
})
export class TableComponent {
  products: Product[] = [];
  columns: string[] = ['id', 'title', 'price', 'cover'];
  total: number = 0;

  private http = inject(HttpClient);

  ngOnInit(): void {
    this.http
      .get<Product[]>('https://api.escuelajs.co/api/v1/products')
      .subscribe((data) => {
        this.products = data;

        this.total = this.products
          .map((item) => item.price)
          .reduce((price, total) => price + total, 0);
      });
  }
}
