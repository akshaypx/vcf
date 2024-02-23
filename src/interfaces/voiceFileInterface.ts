export interface voiceFileResponse {
  product_name: string;
  quantity: number;
  product_size?: (ProductSizeEntity | null)[] | null;
  search_prod_list?: SearchProdListEntity[] | null;
}
export interface ProductSizeEntity {
  value: number;
  unit: string;
  sign: string;
}
export interface SearchProdListEntity {
  product_code: string;
  product_name: string;
  summary: string;
  image_link: string;
  price: string;
  varient?: null;
}
