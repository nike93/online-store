export interface ProductItem {
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
export interface AllProducts {
  prod: ProductItem[];
  total: number;
}

export interface StateMarket {
  view?: string;
  cart: Cart;
  appliedCuppons: Coupon[];
  pagination: Pagination;
  filters: Filters;
}

export interface Cart {
  items: CartState[];
  promoString: string;
}

export interface CartState {
  prod: ProductItem;
  qty: number;
}

export interface Coupon {
  name: string;
  description: string;
  percentage: number;
}

export interface Pagination {
  limit?: number;
  page?: number;
}

export interface Filters {
  checkboxes: checkboxeInputs;
  range: rangeInputs;
  filteredData: ProductItem[];
  searchFocus: boolean;
  search?: string;
  sorting?: string;
  isChangedByRange: boolean;
}

export type checkboxeInputs = {
  [prop in keyof Partial<ProductItem>]: string[];
};

export type rangeInputs = {
  [prop in keyof Partial<ProductItem>]: number[];
};
