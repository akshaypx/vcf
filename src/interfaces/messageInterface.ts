export interface UserRequest {
  user_request: string;
  selectedProduct?: ProductsEntity | null;
  products?: ProductsEntity[] | null;
  current_intent?: string | null;
  ask_for?: string | null;
  cart_id?: string | null;
  address_id?: string | null;
  order_id?: string | null;
  prv_response?: string | null;
  show_page?: string | null;
  quantity?: number | null;
  next_event?: string | null;
}
export interface ResponseData {
  responce_data: string;
  selectedProduct?: ResponseProductsEntity | null;
  products?: ResponseProductsEntity[] | null;
  current_intent?: string | null;
  ask_for?: string | null;
  cart_id?: string | null;
  address_id?: string | null;
  order_id?: string | null;
  prv_response?: string | null;
  show_page?: string | null;
  quantity?: number | null;
  next_event?: string | null;
}
export interface ResponseProductsEntity {
  product_code: string;
  product_name: string;
  summary: string;
  price: number;
  varient?: VarientEntity[] | null;
  image_link: string;
  pack_size: string;
  pack_type: string;
  is_conversion: boolean;
}
export interface ProductsEntity {
  product_code: string;
  product_name: string;
  summary: string;
  price: string;
  varient?: VarientEntity[] | null;
  image_link: string;
  pack_size: string;
  pack_type: string;
  is_conversion: boolean;
}
export interface Message {
  text: string;
  products?: ProductsEntity[] | null;
  selectedProduct?: ProductsEntity | null;
  varient?: VarientEntity[] | null;
}
export interface VarientEntity {
  name: string;
  selected_varient?: string | null;
  avilable?: string[] | null;
}
