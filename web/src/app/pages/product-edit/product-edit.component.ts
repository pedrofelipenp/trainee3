import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ProductsApiService } from '../../core/products-api.service';

@Component({
  selector: 'app-product-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './product-edit.component.html',
})
export class ProductEditComponent {
  private readonly fb = inject(FormBuilder);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly productsApi = inject(ProductsApiService);

  readonly productId = this.route.snapshot.paramMap.get('id') ?? '';

  loading = false;
  saving = false;
  errorMessage = '';

  form = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(120)]],
    description: ['', [Validators.maxLength(1000)]],
    price: [0, [Validators.required, Validators.min(0)]],
    stock: [0, [Validators.required, Validators.min(0), Validators.pattern(/^\d+$/)]],
  });

  ngOnInit(): void {
    if (!this.productId) {
      this.errorMessage = 'Produto invalido para edicao.';
      return;
    }

    this.loading = true;
    this.productsApi.getById(this.productId).subscribe({
      next: (product) => {
        const parsedPrice = parseFloat(product.price);
        this.form.patchValue({
          name: product.name,
          description: product.description ?? '',
          price: Number.isFinite(parsedPrice) ? parsedPrice : 0,
          stock: product.stock,
        });
        this.loading = false;
      },
      error: (error: Error) => {
        this.errorMessage = error.message;
        this.loading = false;
      },
    });
  }

  submit(): void {
    if (this.form.invalid || this.saving || !this.productId) {
      this.form.markAllAsTouched();
      return;
    }

    this.saving = true;
    this.errorMessage = '';

    const payload = {
      ...this.form.getRawValue(),
      description: this.form.value.description?.trim() || undefined,
    };

    this.productsApi.update(this.productId, payload).subscribe({
      next: () => {
        this.saving = false;
        this.router.navigate(['/products']);
      },
      error: (error: Error) => {
        this.saving = false;
        this.errorMessage = error.message;
      },
    });
  }
}
