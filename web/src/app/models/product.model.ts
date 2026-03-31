export interface Product {
  id: string;
  name: string;
  description?: string;
  price: string;
  stock: number;
  createdAt: string;
  updatedAt: string;
}

export interface ProductPayload {
  name: string;
  description?: string;
  price: number;
  stock: number;
}

export interface PaginatedProducts {
  data: Product[];
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}
