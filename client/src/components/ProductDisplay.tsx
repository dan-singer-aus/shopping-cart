import type { Product } from "../types";
import { useState } from "react";
import { EditProductForm } from "./EditProductForm";

interface ProductDisplayProps {
  productDetails: Product;
  onEditProduct: (product: Product) => Promise<void>;
  onDeleteProduct: (productId: string) => Promise<void>;
  onAddToCart: (productId: string) => Promise<void>;
}

export const ProductDisplay = ({
  productDetails,
  onEditProduct,
  onDeleteProduct,
  onAddToCart,
}: ProductDisplayProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const toggleEditFormVisibility = () =>
    setIsVisible((currentState) => !currentState);

  const handleAddToCartClick = (event: React.MouseEvent) => {
    event.preventDefault();
    if (productDetails.quantity === 0) {
      alert("No Products left");
    } else {
      onAddToCart(productDetails._id);
    }
  };

  const displayActions = () => {
    return (
      <div className="actions product-actions">
        <button className="add-to-cart" onClick={handleAddToCartClick}>
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
      onEditProduct={onEditProduct}
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
        aria-label="delete"
        className="delete-button"
        onClick={() => onDeleteProduct(productDetails._id)}
      >
        <span>X</span>
      </button>
    </>
  );
};
