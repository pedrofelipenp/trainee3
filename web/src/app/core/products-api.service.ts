import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { PaginatedProducts, Product, ProductPayload } from '../models/product.model';

@Injectable({ providedIn: 'root' })
export class ProductsApiService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = 'http://localhost:3000/products';

  list(page: number, limit: number, search: string): Observable<PaginatedProducts> {
    let params = new HttpParams()
      .set('page', page)
      .set('limit', limit);

    if (search.trim()) {
      params = params.set('search', search.trim());
    }

    return this.http
      .get<PaginatedProducts>(this.baseUrl, { params })
      .pipe(catchError((error) => this.handleError(error)));
  }

  getById(id: string): Observable<Product> {
    return this.http
      .get<Product>(`${this.baseUrl}/${id}`)
      .pipe(catchError((error) => this.handleError(error)));
  }

  create(payload: ProductPayload): Observable<Product> {
    return this.http
      .post<Product>(this.baseUrl, payload)
      .pipe(catchError((error) => this.handleError(error)));
  }

  update(id: string, payload: ProductPayload): Observable<Product> {
    return this.http
      .put<Product>(`${this.baseUrl}/${id}`, payload)
      .pipe(catchError((error) => this.handleError(error)));
  }

  remove(id: string): Observable<void> {
    return this.http
      .delete<void>(`${this.baseUrl}/${id}`)
      .pipe(catchError((error) => this.handleError(error)));
  }

  private handleError(error: { error?: { message?: string | string[] } }): Observable<never> {
    const message = error.error?.message;

    if (Array.isArray(message)) {
      return throwError(() => new Error(message.join(', ')));
    }

    if (typeof message === 'string') {
      return throwError(() => new Error(message));
    }

    return throwError(() => new Error('Falha ao comunicar com a API.'));
  }
}
