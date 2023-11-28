import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CdkTableModule } from '@angular/cdk/table';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NavbarComponent } from './../../pages/navbar/navbar.component';
import { Product } from './../../models/product.model';
import { DataSourceProducts } from './data-source';
import { BtnComponent } from './../../components/btn/btn.component';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [
    CommonModule,
    CdkTableModule,
    NavbarComponent,
    HttpClientModule,
    BtnComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './table.component.html',
})
export class TableComponent {
  dataSource = new DataSourceProducts();
  columns: string[] = ['id', 'title', 'price', 'cover', 'action'];
  total: number = 0;
  input = new FormControl('', { nonNullable: true });

  private http = inject(HttpClient);

  ngOnInit(): void {
    this.http
      .get<Product[]>('https://api.escuelajs.co/api/v1/products')
      .subscribe((data) => {
        this.dataSource.init(data);
        this.total = this.dataSource.getTotal();
      });

    this.input.valueChanges.pipe(debounceTime(1000)).subscribe((value) => {
      this.dataSource.find(value);
      this.total = this.dataSource.getTotal();
    });
  }

  update(product: Product) {
    this.dataSource.update(product.id, { price: 20 });
    this.total = this.dataSource.getTotal();
  }
}
