import React from "react";
import type { ProductInput } from "../types";
import { FormInputs } from "./FormInputs";

interface AddProductFormProps {
  toggleVisibility: () => void;
  onAddNewProduct: (
    ProductInput: ProductInput,
    callback?: () => void
  ) => Promise<void>;
}

export const AddProductForm = ({
  toggleVisibility,
  onAddNewProduct,
}: AddProductFormProps) => {
  const [title, setTitle] = React.useState("");
  const [quantity, setQuantity] = React.useState(0);
  const [price, setPrice] = React.useState(0);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const productInput: ProductInput = { title, quantity, price };
    await onAddNewProduct(productInput, toggleVisibility);
  };

  return (
    <div className="add-form">
      <form onSubmit={handleSubmit} aria-label="add a product">
        <FormInputs
          title={title}
          quantity={quantity}
          price={price}
          setTitle={setTitle}
          setQuantity={setQuantity}
          setPrice={setPrice}
        />
        <div className="actions form-actions">
          <button type="submit">Add</button>
          <button type="button" onClick={toggleVisibility}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};
