import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ProductsApiService } from '../../core/products-api.service';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-products-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './products-list.component.html',
  styleUrl: './products-list.component.scss',
})
export class ProductsListComponent {
  private readonly productsApi = inject(ProductsApiService);

  products: Product[] = [];
  loading = false;
  deletingId = '';
  errorMessage = '';

  page = 1;
  limit = 10;
  total = 0;
  totalPages = 1;
  search = '';

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.loading = true;
    this.errorMessage = '';

    this.productsApi.list(this.page, this.limit, this.search).subscribe({
      next: (response) => {
        this.products = response.data;
        this.page = response.page;
        this.limit = response.limit;
        this.total = response.total;
        this.totalPages = response.totalPages;
        this.loading = false;
      },
      error: (error: Error) => {
        this.errorMessage = error.message;
        this.loading = false;
      },
    });
  }

  applySearch(): void {
    this.page = 1;
    this.loadProducts();
  }

  previousPage(): void {
    if (this.page <= 1 || this.loading) {
      return;
    }

    this.page -= 1;
    this.loadProducts();
  }

  nextPage(): void {
    if (this.page >= this.totalPages || this.loading) {
      return;
    }

    this.page += 1;
    this.loadProducts();
  }

  confirmDelete(product: Product): void {
    const confirmation = window.confirm(
      `Deseja excluir o produto "${product.name}"? Esta acao nao pode ser desfeita.`,
    );

    if (!confirmation) {
      return;
    }

    this.deletingId = product.id;
    this.errorMessage = '';

    this.productsApi.remove(product.id).subscribe({
      next: () => {
        this.deletingId = '';

        if (this.products.length === 1 && this.page > 1) {
          this.page -= 1;
        }

        this.loadProducts();
      },
      error: (error: Error) => {
        this.deletingId = '';
        this.errorMessage = error.message;
      },
    });
  }
}
