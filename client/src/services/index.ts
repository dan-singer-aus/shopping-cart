import axios from "axios";
import { productSchema, cartItemSchema, updateSetSchema } from "../types";
import type { ProductInput, Product } from "../types";
import { z } from "zod/v4";

const baseUrl = "/api";

const getAllProducts = async () => {
  try {
    const response = await axios.get(`${baseUrl}/products`);
    return z.array(productSchema).parse(response.data);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const createNewProduct = async (productInput: ProductInput) => {
  try {
    const response = await axios.post(`${baseUrl}/products`, productInput);
    return productSchema.parse(response.data);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const editProduct = async (product: Product) => {
  try {
    const response = await axios.put(
      `${baseUrl}/products/${product._id}`,
      product
    );
    return productSchema.parse(response.data);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const deleteProduct = async (productId: string) => {
  try {
    await axios.delete(`${baseUrl}/products/${productId}`);
    return null;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const getAllCartProducts = async () => {
  try {
    const response = await axios.get(`${baseUrl}/cart`);
    return z.array(cartItemSchema).parse(response.data);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const addToCart = async (productId: string) => {
  try {
    const response = await axios.post(`${baseUrl}/add-to-cart`, {
      productId,
    });
    return updateSetSchema.parse(response.data);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const checkout = async () => {
  try {
    await axios.post(`${baseUrl}/checkout`);
    return null;
  } catch (error) {
    console.log(error);
    throw error;
  }
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
