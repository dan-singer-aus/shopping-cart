import type { CartItem } from "../types";
import { CartTable } from "./CartTable";

interface CartProps {
  cartItems: CartItem[];
  onCheckout: () => Promise<void>;
}

export const Cart = ({ cartItems, onCheckout }: CartProps) => {
  const emptyCartDisplay = () => (
    <>
      <p>Your cart is empty</p>
      <button className="checkout" disabled>
        Checkout
      </button>
    </>
  );

  const populatedCartDisplay = () => (
    <>
      <CartTable cartItems={cartItems} />
      <button className="checkout" onClick={() => onCheckout()}>
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
