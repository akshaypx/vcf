export interface voiceFileResponse {
  product_name: string;
  quantity: number;
  product_size?: (ProductSizeEntity | null)[] | null;
}
export interface ProductSizeEntity {
  value: number;
  unit: string;
  sign: string;
}
