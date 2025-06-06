import React from "react";

interface FormInputsProps {
  title: string;
  price: number;
  quantity: number;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  setPrice: React.Dispatch<React.SetStateAction<number>>;
  setQuantity: React.Dispatch<React.SetStateAction<number>>;
}

export const FormInputs = ({
  title,
  price,
  quantity,
  setTitle,
  setPrice,
  setQuantity,
}: FormInputsProps) => {
  return (
    <>
      <div className="input-group">
        <label htmlFor="product-name">Product Name:</label>
        <input
          type="text"
          id="product-name"
          name="product-name"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          required
        />
      </div>
      <div className="input-group">
        <label htmlFor="product-price">Price:</label>
        <input
          type="number"
          value={price}
          onChange={(event) => setPrice(Number(event.target.value))}
          id="product-price"
          name="product-price"
          min="0"
          step="0.01"
          required
        />
      </div>
      <div className="input-group">
        <label htmlFor="product-quantity">Quantity:</label>
        <input
          type="number"
          value={quantity}
          onChange={(event) => setQuantity(Number(event.target.value))}
          id="product-quantity"
          name="product-quantity"
          min="0"
          required
        />
      </div>
    </>
  );
};
