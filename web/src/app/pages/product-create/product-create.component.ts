import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ProductsApiService } from '../../core/products-api.service';

@Component({
  selector: 'app-product-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './product-create.component.html',
})
export class ProductCreateComponent {
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly productsApi = inject(ProductsApiService);

  saving = false;
  errorMessage = '';

  form = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(120)]],
    description: ['', [Validators.maxLength(1000)]],
    price: [0, [Validators.required, Validators.min(0)]],
    stock: [0, [Validators.required, Validators.min(0), Validators.pattern(/^\d+$/)]],
  });

  submit(): void {
    if (this.form.invalid || this.saving) {
      this.form.markAllAsTouched();
      return;
    }

    this.saving = true;
    this.errorMessage = '';

    const payload = {
      ...this.form.getRawValue(),
      description: this.form.value.description?.trim() || undefined,
    };

    this.productsApi.create(payload).subscribe({
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
