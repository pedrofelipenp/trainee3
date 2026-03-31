import { Routes } from '@angular/router';
import { ProductCreateComponent } from './pages/product-create/product-create.component';
import { ProductEditComponent } from './pages/product-edit/product-edit.component';
import { ProductsListComponent } from './pages/products-list/products-list.component';

export const routes: Routes = [
	{ path: '', pathMatch: 'full', redirectTo: 'products' },
	{ path: 'products', component: ProductsListComponent },
	{ path: 'products/new', component: ProductCreateComponent },
	{ path: 'products/:id/edit', component: ProductEditComponent },
	{ path: '**', redirectTo: 'products' },
];
