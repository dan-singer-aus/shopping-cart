import "./assets/whitespace-reset.css";
import "./assets/main.css";
import React from "react";
import type { Product, CartItem, ProductInput } from "./types";
import { ProductListing } from "./components/ProductListing";
import { ToggleableAddProductForm } from "./components/ToggleableAddProductForm";
import { Cart } from "./components/Cart";
import utils from "./utils";
import services from "./services";

const App = () => {
  const [products, setProducts] = React.useState<Product[]>([]);
  const [cartItems, setCartItems] = React.useState<CartItem[]>([]);

  React.useEffect(() => {
    const initializeProducts = async () => {
      try {
        const productList = await services.getAllProducts();
        setProducts(productList);
      } catch (error: unknown) {
        console.log(error);
        if (error instanceof Error) {
          alert(error.message);
        }
      }
    };
    const initializeCart = async () => {
      try {
        const cartList = await services.getAllCartProducts();
        setCartItems(cartList);
      } catch (error: unknown) {
        console.log(error);
        if (error instanceof Error) {
          alert(error.message);
        }
      }
    };
    initializeProducts();
    initializeCart();
  }, []);

  const handleAddNewProduct = async (
    productInput: ProductInput,
    callback?: () => void
  ) => {
    try {
      const savedProduct = await services.createNewProduct(productInput);
      utils.productStateUpdater(setProducts, savedProduct);
      if (callback) {
        callback();
      }
    } catch (error: unknown) {
      console.log(error);
      if (error instanceof Error) {
        alert(error.message);
      }
    }
  };

  const handleEditProduct = async (product: Product, callback?: () => void) => {
    try {
      const updatedProduct = await services.editProduct(product);
      utils.productStateUpdater(setProducts, updatedProduct);
      if (callback) {
        callback();
      }
    } catch (error: unknown) {
      console.log(error);
      if (error instanceof Error) {
        alert(error.message);
      }
    }
  };

  const handleDeleteProduct = async (productId: string) => {
    try {
      await services.deleteProduct(productId);
      setProducts((currentState) => {
        return currentState.filter((product) => product._id !== productId);
      });
    } catch (error: unknown) {
      console.log(error);
      if (error instanceof Error) {
        alert(error.message);
      }
    }
  };

  const handleAddToCart = async (productId: string) => {
    try {
      const updateSet = await services.addToCart(productId);
      utils.productStateUpdater(setProducts, updateSet.product);
      utils.cartStateUpdater(setCartItems, updateSet.item);
    } catch (error: unknown) {
      console.log(error);
      if (error instanceof Error) {
        alert(error.message);
      }
    }
  };

  const handleCheckout = async () => {
    try {
      await services.checkout();
      setCartItems([]);
    } catch (error: unknown) {
      console.log(error);
      if (error instanceof Error) {
        alert(error.message);
      }
    }
  };

  return (
    <>
      <header>
        <h1>The Shop!</h1>
        <Cart cartItems={cartItems} onCheckout={handleCheckout} />
      </header>
      <main>
        <ProductListing
          products={products}
          onEditProduct={handleEditProduct}
          onDeleteProduct={handleDeleteProduct}
          onAddToCart={handleAddToCart}
        />
        <ToggleableAddProductForm onAddNewProduct={handleAddNewProduct} />
      </main>
    </>
  );
};

export default App;
