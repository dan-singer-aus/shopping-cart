import type { ProductInput } from "../types";
import { useState } from "react";
import { AddProductForm } from "./AddProductForm";

interface ToggleAddProductFormProps {
  onAddNewProduct: (ProductInput: ProductInput) => Promise<void>;
}

export const ToggleableAddProductForm = ({
  onAddNewProduct,
}: ToggleAddProductFormProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible((currentState) => !currentState);

  const displayAddProductForm = () => (
    <AddProductForm
      onAddNewProduct={onAddNewProduct}
      toggleVisibility={toggleVisibility}
    />
  );

  const displayButton = () => (
    <p>
      <button className="add-product-button" onClick={toggleVisibility}>
        Add A Product
      </button>
    </p>
  );

  return <>{isVisible ? displayAddProductForm() : displayButton()}</>;
};
