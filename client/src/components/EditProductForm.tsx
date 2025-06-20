import React from "react";
import type { Product } from "../types";
import { FormInputs } from "./FormInputs";

interface EditProductFormProps {
  productDetails: Product;
  onEditProduct: (product: Product, callback?: () => void) => Promise<void>;
  toggleEditFormVisibility: () => void;
}
export const EditProductForm = ({
  productDetails,
  onEditProduct,
  toggleEditFormVisibility,
}: EditProductFormProps) => {
  const [title, setTitle] = React.useState(productDetails.title);
  const [quantity, setQuantity] = React.useState(productDetails.quantity);
  const [price, setPrice] = React.useState(productDetails.price);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const amendedProduct: Product = {
      ...productDetails,
      title,
      quantity,
      price,
    };
    await onEditProduct(amendedProduct, toggleEditFormVisibility);
  };

  return (
    <div className="edit-form">
      <h3>Edit Product</h3>
      <form aria-label="edit a product" onSubmit={handleSubmit}>
        <FormInputs
          title={title}
          quantity={quantity}
          price={price}
          setTitle={setTitle}
          setQuantity={setQuantity}
          setPrice={setPrice}
        />
        <div className="actions form-actions">
          <button type="submit">Update</button>
          <button type="button" onClick={toggleEditFormVisibility}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};
