import { Component, Injectable, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './../navbar/navbar.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ScrollingModule } from '@angular/cdk/scrolling';

interface Product {
  id: string;
  title: string;
  price: number;
  images: string[];
}

// @Injectable({
//   providedIn: 'root',
// })

@Component({
  selector: 'app-scroll',
  standalone: true,
  imports: [CommonModule, NavbarComponent, HttpClientModule, ScrollingModule],
  templateUrl: './scroll.component.html',
})
export class ScrollComponent {
  products: Product[] = [];

  private http = inject(HttpClient);

  constructor() {}

  ngOnInit(): void {
    this.http
      .get<Product[]>('https://api.escuelajs.co/api/v1/products')
      .subscribe((data) => {
        this.products = data;
      });
  }
}
