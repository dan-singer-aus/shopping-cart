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
        <label htmlFor="product-name">
          Product Name:
          <input
            type="text"
            id="product-name"
            name="product-name"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            required
          />
        </label>
      </div>
      <div className="input-group">
        <label htmlFor="product-price">
          Price:
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
        </label>
      </div>
      <div className="input-group">
        <label htmlFor="product-quantity">
          Quantity:
          <input
            type="number"
            value={quantity}
            onChange={(event) => setQuantity(Number(event.target.value))}
            id="product-quantity"
            name="product-quantity"
            min="0"
            required
          />
        </label>
      </div>
    </>
  );
};
