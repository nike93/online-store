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
}

export interface cart {
  items: cartItem[];
}

export interface cartItem {
  prod: productItem;
  qty: number;
}
