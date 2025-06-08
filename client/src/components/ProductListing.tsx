import type { Product } from "../types";
import { ProductDisplay } from "./ProductDisplay";

interface ProductListingProps {
  products: Product[];
  onEditProduct: (product: Product) => Promise<void>;
  onDeleteProduct: (productId: string) => Promise<void>;
  onAddToCart: (productId: string) => Promise<void>;
}

export const ProductListing = ({
  products,
  onEditProduct,
  onDeleteProduct,
  onAddToCart,
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
                onEditProduct={onEditProduct}
                onDeleteProduct={onDeleteProduct}
                onAddToCart={onAddToCart}
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
