import React from "react";
import type { Product, CartItem } from "../types";

const productStateUpdater = (
  setterFn: React.Dispatch<React.SetStateAction<Product[]>>,
  productUpdate: Product
) => {
  setterFn((currentState: Product[]) => {
    if (currentState.find((product) => product._id === productUpdate._id)) {
      return currentState.map((product: Product) => {
        if (product._id === productUpdate._id) {
          return productUpdate;
        } else {
          return product;
        }
      });
    } else {
      return currentState.concat(productUpdate);
    }
  });
};

const cartStateUpdater = (
  setterFn: React.Dispatch<React.SetStateAction<CartItem[]>>,
  cartItemUpdate: CartItem
) => {
  setterFn((currentState: CartItem[]) => {
    if (currentState.find((cartItem) => cartItem._id === cartItemUpdate._id)) {
      return currentState.map((cartItem: CartItem) => {
        if (cartItem._id === cartItemUpdate._id) {
          return cartItemUpdate;
        } else {
          return cartItem;
        }
      });
    } else {
      return currentState.concat(cartItemUpdate);
    }
  });
};

export default { productStateUpdater, cartStateUpdater };
