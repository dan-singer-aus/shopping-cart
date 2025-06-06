export type Product = {
  _id: string;
  title: string;
  quantity: number;
  price: number;
};

export type ProductInput = Omit<Product, "_id">;

export type CartItem = Product & { productId: string };

export type UpdateSet = {
  product: Product;
  item: CartItem;
};
