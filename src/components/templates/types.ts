export interface productItem {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
}
export interface allProducts {
  prod: productItem[];
  total: number;
}

export interface state {
  view?: string;
  cart: cart;
  appliedCuppons: coupon[];
  pagination: pagination;
  filters: filters;
}

export interface cart {
  items: cartItem[];
}

export interface cartItem {
  prod: productItem;
  qty: number;
}

export interface coupon {
  name: string;
  description: string;
  percentage: number;
}

export interface pagination {
  limit?: number;
  page?: number;
}

export interface filters {
  checkboxes: checkboxes;
  search: string;
  range: object;
}

export type checkboxes = {
  [prop in keyof Partial<productItem>]: string[];
};
