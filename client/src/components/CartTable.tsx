import type { CartItem } from "../types";
import utils from "../utils";

interface CartTableProps {
  cartItems: CartItem[];
}

export const CartTable = ({ cartItems }: CartTableProps) => {
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
            Total: ${utils.calculateCartTotal(cartItems).toFixed(2)}
          </td>
        </tr>
      </tfoot>
    </table>
  );
};
