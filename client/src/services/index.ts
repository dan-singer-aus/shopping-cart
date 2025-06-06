import axios from "axios";
import type { Product, ProductInput, CartItem, UpdateSet } from "../types";

const baseUrl = "/api";

const getAllProducts = async () => {
  const response = await axios.get<Product[]>(`${baseUrl}/products`);
  return response.data;
};

const createNewProduct = async (productInput: ProductInput) => {
  const response = await axios.post<Product>(
    `${baseUrl}/products`,
    productInput
  );
  return response.data;
};

const editProduct = async (product: Product) => {
  const response = await axios.put<Product>(
    `${baseUrl}/products/${product._id}`,
    product
  );
  return response.data;
};

const deleteProduct = async (productId: string) => {
  await axios.delete(`${baseUrl}/products/${productId}`);
  return null;
};

const getAllCartProducts = async () => {
  const response = await axios.get<CartItem[]>(`${baseUrl}/cart`);
  return response.data;
};

const addToCart = async (productId: string) => {
  const response = await axios.post<UpdateSet>(`${baseUrl}/add-to-cart`, {
    productId,
  });
  console.log(response);
  return response.data;
};

const checkout = async () => {
  await axios.post(`${baseUrl}/checkout`);
  return null;
};

export default {
  getAllProducts,
  createNewProduct,
  editProduct,
  deleteProduct,
  getAllCartProducts,
  addToCart,
  checkout,
};
