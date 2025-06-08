import { cleanup, render, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, test } from "vitest";
import services from "./services";
import App from "./App";
import type { Product, CartItem, ProductInput, UpdateSet } from "./types";

vi.mock("./services");
const mockedServices = vi.mocked(services, true);

const mockedProducts: Product[] = [
  { _id: "1", title: "Iphone", price: 799.99, quantity: 1 },
  { _id: "2", title: "Samsung", price: 700.99, quantity: 20 },
];

const mockedCartItems: CartItem[] = [
  { _id: "20", productId: "6", title: "Monitor", price: 299.99, quantity: 1 },
  { _id: "22", productId: "1", title: "Iphone", price: 799.99, quantity: 1 },
];

const mockedInput: ProductInput = {
  title: "MacBook Air",
  price: 1400,
  quantity: 100,
};

const mockedUpdateSet: UpdateSet = {
  product: { ...mockedProducts[0], quantity: 0 },
  item: { ...mockedCartItems[1], quantity: 2 },
};

const loadProducts = (products: Product[]) => {
  return mockedServices.getAllProducts.mockResolvedValue(products);
};

const loadCartItems = (cartItems: CartItem[]) => {
  return mockedServices.getAllCartProducts.mockResolvedValue(cartItems);
};

const grabAddFormElements = () => {
  const form = screen.getByRole("form", { name: /add a product/i });
  const nameInput = screen.getByRole("textbox", { name: /product name:/i });
  const quantityInput = screen.getByRole("spinbutton", { name: /quantity:/i });
  const priceInput = screen.getByRole("spinbutton", { name: /price:/i });
  const addButton = screen.getByRole("button", { name: /^add$/i });
  const cancelButton = screen.getByRole("button", { name: /cancel/i });
  return {
    form,
    nameInput,
    quantityInput,
    priceInput,
    addButton,
    cancelButton,
  };
};

const grabEditFormElements = () => {
  const form = screen.getByRole("form", { name: /edit a product/i });
  const nameInput = screen.getByRole("textbox", { name: /product name:/i });
  const quantityInput = screen.getByRole("spinbutton", { name: /quantity:/i });
  const priceInput = screen.getByRole("spinbutton", { name: /price:/i });
  const updateButton = screen.getByRole("button", { name: /^update$/i });
  const cancelButton = screen.getByRole("button", { name: /cancel/i });
  return {
    form,
    nameInput,
    quantityInput,
    priceInput,
    updateButton,
    cancelButton,
  };
};

afterEach(() => {
  cleanup();
  vi.resetAllMocks();
});

test("Static content renders correctly", async () => {
  loadCartItems([]);
  loadProducts([]);
  await act(async () => render(<App />));

  expect(screen.getByText("The Shop!")).toBeInTheDocument();
  expect(screen.getByText("Your Cart")).toBeInTheDocument();
  expect(screen.getByText("Products")).toBeInTheDocument();
});

test("Products are loaded into the cart and product listing", async () => {
  loadCartItems(mockedCartItems);
  loadProducts(mockedProducts);
  await act(async () => render(<App />));

  expect(screen.getAllByText(mockedProducts[0].title)).toHaveLength(2);
  expect(screen.getAllByText(mockedProducts[1].title)).toHaveLength(1);
  expect(screen.getAllByText(mockedCartItems[0].title)).toHaveLength(1);
});

test("Empty Cart renders correctly", async () => {
  loadCartItems([]);
  loadProducts(mockedProducts);
  await act(async () => render(<App />));

  expect(screen.getByText("Your cart is empty")).toBeInTheDocument();
});

test("Cart calculates the correct total", async () => {
  loadCartItems(mockedCartItems);
  loadProducts([]);
  await act(async () => render(<App />));

  expect(screen.getByText("Total: $1099.98")).toBeInTheDocument();
});

test("Clicking 'Checkout' clears the cart", async () => {
  loadCartItems(mockedCartItems);
  loadProducts([]);
  await act(async () => render(<App />));

  expect(screen.getByText("Total: $1099.98")).toBeInTheDocument();

  const addButton = screen.getByRole("button", { name: /checkout/i });
  await userEvent.click(addButton);
  expect(screen.getByText("Your cart is empty")).toBeInTheDocument();
});

test("Clicking 'Add a Product' button displays the Add Product form", async () => {
  loadCartItems([]);
  loadProducts([]);
  await act(async () => render(<App />));

  const addButton = screen.getByRole("button", { name: /add a product/i });
  await userEvent.click(addButton);
  const AddProductForm = grabAddFormElements();

  expect(AddProductForm.form).toBeInTheDocument();
  expect(AddProductForm.nameInput).toBeInTheDocument();
  expect(AddProductForm.priceInput).toBeInTheDocument();
  expect(AddProductForm.quantityInput).toBeInTheDocument();
  expect(AddProductForm.addButton).toBeInTheDocument();
  expect(AddProductForm.cancelButton).toBeInTheDocument();
});

test("Clicking the Cancel button on the Add Product form removes the Add Product form", async () => {
  loadCartItems([]);
  loadProducts([]);
  await act(async () => render(<App />));

  const addButton = screen.getByRole("button", { name: /add a product/i });
  await userEvent.click(addButton);
  const addProductForm = grabAddFormElements();

  await userEvent.click(addProductForm.cancelButton);
  expect(addProductForm.form).not.toBeInTheDocument();
});

test("Entering details into the Add Product form displays the input", async () => {
  loadCartItems([]);
  loadProducts([]);
  await act(async () => render(<App />));

  const addButton = screen.getByRole("button", { name: /add a product/i });
  await userEvent.click(addButton);
  const ProductForm = grabAddFormElements();

  await userEvent.type(ProductForm.nameInput, mockedInput.title);
  await userEvent.type(ProductForm.priceInput, String(mockedInput.price));
  await userEvent.type(ProductForm.quantityInput, String(mockedInput.quantity));

  expect(screen.getByDisplayValue(mockedInput.title)).toBeInTheDocument();
  expect(screen.getByDisplayValue(`${mockedInput.price}`)).toBeInTheDocument();
  expect(
    screen.getByDisplayValue(`${mockedInput.quantity}`)
  ).toBeInTheDocument();
});

test("Adding a product closes the form and adds the product listing", async () => {
  loadCartItems([]);
  loadProducts([]);
  mockedServices.createNewProduct.mockResolvedValue({
    _id: "15",
    ...mockedInput,
  });
  await act(async () => render(<App />));

  const addButton = screen.getByRole("button", { name: /add a product/i });
  await userEvent.click(addButton);
  const ProductForm = grabAddFormElements();

  await userEvent.type(ProductForm.nameInput, mockedInput.title);
  await userEvent.type(ProductForm.priceInput, String(mockedInput.price));
  await userEvent.type(ProductForm.quantityInput, String(mockedInput.quantity));
  await userEvent.click(ProductForm.addButton);

  expect(ProductForm.form).not.toBeInTheDocument();
  expect(screen.getByText(mockedInput.title)).toBeInTheDocument();
  expect(screen.getByText(`$${mockedInput.price}`)).toBeInTheDocument();
  expect(
    screen.getByText(`${mockedInput.quantity} left in stock`)
  ).toBeInTheDocument();
});

test("Deleting a product removes its listing", async () => {
  loadCartItems([]);
  loadProducts(mockedProducts);
  await act(async () => render(<App />));

  const product = screen.getByText(mockedProducts[0].title);
  expect(product).toBeInTheDocument();

  const deleteButton = screen.getAllByRole("button", { name: "delete" })[0];
  await userEvent.click(deleteButton);
  expect(product).not.toBeInTheDocument();
});

test("Clicking an Edit button renders the Edit Product form correctly", async () => {
  loadCartItems([]);
  loadProducts(mockedProducts);
  await act(async () => render(<App />));

  const editButton = screen.getAllByRole("button", { name: /edit/i })[0];
  await userEvent.click(editButton);
  const productForm = grabEditFormElements();

  expect(productForm.form).toBeInTheDocument();
  expect(productForm.nameInput).toBeInTheDocument();
  expect(productForm.nameInput).toHaveDisplayValue(mockedProducts[0].title);
  expect(productForm.priceInput).toHaveDisplayValue(
    `${mockedProducts[0].price}`
  );
  expect(productForm.quantityInput).toHaveDisplayValue(
    `${mockedProducts[0].quantity}`
  );
  expect(productForm.cancelButton).toBeInTheDocument();
  expect(productForm.updateButton).toBeInTheDocument();
});

test("clicking 'Cancel' removes the edit product", async () => {
  loadCartItems([]);
  loadProducts(mockedProducts);
  await act(async () => render(<App />));

  const editButton = screen.getAllByRole("button", { name: /edit/i })[0];
  await userEvent.click(editButton);
  const productForm = grabEditFormElements();

  expect(productForm.form).toBeInTheDocument();
  await userEvent.click(productForm.cancelButton);
  expect(productForm.form).not.toBeInTheDocument();
});

test("Editing a product changes its listed details", async () => {
  loadCartItems([]);
  loadProducts(mockedProducts);
  mockedServices.editProduct.mockResolvedValue({
    _id: mockedProducts[0]._id,
    ...mockedInput,
  });
  await act(async () => render(<App />));

  const editButton = screen.getAllByRole("button", { name: /edit/i })[0];
  await userEvent.click(editButton);
  const productForm = grabEditFormElements();

  await userEvent.clear(productForm.nameInput);
  await userEvent.type(productForm.nameInput, mockedInput.title);
  await userEvent.clear(productForm.priceInput);
  await userEvent.type(productForm.priceInput, `${mockedInput.price}`);
  await userEvent.clear(productForm.quantityInput);
  await userEvent.type(productForm.quantityInput, `${mockedInput.quantity}`);
  await userEvent.click(productForm.updateButton);

  expect(productForm.form).not.toBeInTheDocument();
  expect(screen.getByText(mockedInput.title)).toBeInTheDocument();
  expect(screen.getByText(`$${mockedInput.price}`)).toBeInTheDocument();
  expect(
    screen.getByText(`${mockedInput.quantity} left in stock`)
  ).toBeInTheDocument();
  expect(screen.queryByText(mockedProducts[0].title)).toBeNull();
});

test("Clicking 'Add to cart' updates both the cart and product listing", async () => {
  loadCartItems(mockedCartItems);
  loadProducts(mockedProducts);
  mockedServices.addToCart.mockResolvedValue(mockedUpdateSet);
  const expectedCartTotal =
    mockedCartItems.reduce((total, current) => total + current.price, 0) +
    mockedUpdateSet.product.price;
  await act(async () => render(<App />));

  const addToCartButton = screen.getAllByRole("button", {
    name: /add to cart/i,
  })[0];

  await userEvent.click(addToCartButton);
  expect(screen.getByText(`Total: $${expectedCartTotal}`)).toBeInTheDocument();
  expect(
    screen.getByText(`${mockedUpdateSet.item.quantity}`)
  ).toBeInTheDocument();
  expect(
    screen.getByText(`${mockedUpdateSet.product.quantity} left in stock`)
  ).toBeInTheDocument();
});
