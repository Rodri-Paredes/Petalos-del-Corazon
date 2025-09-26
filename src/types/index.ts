export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image_url: string;
  created_at: string;
  updated_at: string;
  category?: string;
  stock?: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Cart {
  items: CartItem[];
  total: number;
  itemCount: number;
}

export interface Order {
  id: string;
  order_number: string;
  customer_phone: string;
  customer_name: string;
  items: CartItem[];
  total_amount: number;
  status: string;
  whatsapp_sent: boolean;
  created_at: string;
}

export interface CreateProductData {
  name: string;
  description: string;
  price: number;
  image_url: string;
}

export interface UpdateProductData extends Partial<CreateProductData> {
  id: string;
}