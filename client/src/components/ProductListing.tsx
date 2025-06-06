import type { Product } from "../types";
import { ProductDisplay } from "./ProductDisplay";

interface ProductListingProps {
  products: Product[];
  handleEditProduct: (product: Product) => Promise<void>;
  handleDeleteProduct: (productId: string) => Promise<void>;
  handleAddToCart: (productId: string) => Promise<void>;
}

export const ProductListing = ({
  products,
  handleEditProduct,
  handleDeleteProduct,
  handleAddToCart,
}: ProductListingProps) => {
  return (
    <div className="product-listing">
      <h2>Products</h2>
      <ul className="product-list">
        {products.map((product) => (
          <li className="product" key={product._id}>
            <div className="product-details">
              <ProductDisplay
                productDetails={product}
                handleEditProduct={handleEditProduct}
                handleDeleteProduct={handleDeleteProduct}
                handleAddToCart={handleAddToCart}
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
