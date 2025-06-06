import type { CartItem } from "../types";
import { CartTable } from "./CartTable";

interface CartProps {
  cartItems: CartItem[];
  handleCheckout: () => Promise<void>;
}

export const Cart = ({ cartItems, handleCheckout }: CartProps) => {
  const emptyCartDisplay = () => (
    <>
      <p>cart is empty</p>
      <button className="checkout" disabled>
        Checkout
      </button>
    </>
  );

  const populatedCartDisplay = () => (
    <>
      <CartTable cartItems={cartItems} />
      <button className="checkout" onClick={() => handleCheckout()}>
        Checkout
      </button>
    </>
  );

  return (
    <div className="cart">
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? emptyCartDisplay() : populatedCartDisplay()}
    </div>
  );
};
