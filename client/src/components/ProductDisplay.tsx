import type { Product } from "../types";
import { useState } from "react";
import { EditProductForm } from "./EditProductForm";

interface ProductDisplayProps {
  productDetails: Product;
  handleEditProduct: (product: Product) => Promise<void>;
  handleDeleteProduct: (productId: string) => Promise<void>;
  handleAddToCart: (productId: string) => Promise<void>;
}

export const ProductDisplay = ({
  productDetails,
  handleEditProduct,
  handleDeleteProduct,
  handleAddToCart,
}: ProductDisplayProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const toggleEditFormVisibility = () =>
    setIsVisible((currentState) => !currentState);

  const onAddToCart = (event: React.MouseEvent) => {
    event.preventDefault();
    if (productDetails.quantity === 0) {
      alert("No Products left");
    } else {
      handleAddToCart(productDetails._id);
    }
  };

  const displayActions = () => {
    return (
      <div className="actions product-actions">
        <button className="add-to-cart" onClick={onAddToCart}>
          Add to Cart
        </button>
        <button className="edit" onClick={toggleEditFormVisibility}>
          Edit
        </button>
      </div>
    );
  };

  const displayEditForm = () => (
    <EditProductForm
      productDetails={productDetails}
      handleEditProduct={handleEditProduct}
      toggleEditFormVisibility={toggleEditFormVisibility}
    />
  );

  return (
    <>
      <h3>{productDetails.title}</h3>
      <p className="price">${productDetails.price}</p>
      <p className="quantity">{productDetails.quantity} left in stock</p>
      {isVisible ? displayEditForm() : displayActions()}
      <button
        className="delete-button"
        onClick={() => handleDeleteProduct(productDetails._id)}
      >
        <span>X</span>
      </button>
    </>
  );
};
