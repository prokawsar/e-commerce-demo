export type Category = {
  id: string;
  name: string;
  image: string;
};

export type Product = {
  id: string;
  title: string;
  price: number;
  description: string;
  images: string[];
  category: Category;
  quantity: number;
};

export interface GetProductByIdResponse {
  product: Product;
}
