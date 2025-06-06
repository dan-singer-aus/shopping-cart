import type { ProductInput } from "../types";
import { useState } from "react";
import { AddProductForm } from "./AddProductForm";

interface ToggleAddProductFormProps {
  handleAddNewProduct: (ProductInput: ProductInput) => Promise<void>;
}

export const ToggleableAddProductForm = ({
  handleAddNewProduct,
}: ToggleAddProductFormProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible((currentState) => !currentState);

  const displayAddProductForm = () => (
    <AddProductForm
      handleAddNewProduct={handleAddNewProduct}
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
