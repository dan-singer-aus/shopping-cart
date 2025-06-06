import type { CartItem } from "../types";

interface CartTableProps {
  cartItems: CartItem[];
}

export const CartTable = ({ cartItems }: CartTableProps) => {
  const calculateCartTotal = () => {
    return cartItems.reduce(
      (total, current) =>
        total + Number(current.price) * Number(current.quantity),
      0
    );
  };
  return (
    <table className="cart-items">
      <thead>
        <tr>
          <th scope="col">Item</th>
          <th scope="col">Quantity</th>
          <th scope="col">Price</th>
        </tr>
      </thead>
      <tbody>
        {cartItems.map((item) => {
          return (
            <tr key={item._id}>
              <td>{item.title}</td>
              <td>{item.quantity}</td>
              <td>${item.price}</td>
            </tr>
          );
        })}
      </tbody>
      <tfoot>
        <tr>
          <td colSpan={3} className="total">
            Total: ${calculateCartTotal().toFixed(2)}
          </td>
        </tr>
      </tfoot>
    </table>
  );
};
