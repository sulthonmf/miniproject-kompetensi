
import { render, screen, fireEvent } from "@testing-library/react";
import ProductsPage from "../products";
import React from "react";

describe("ProductsPage", () => {
  const products = [
    { id: 1, name: "Product 1" },
    { id: 2, name: "Product 2" },
    { id: 3, name: "Another Product" },
  ];

  it("filters products based on search keyword", () => {
    render(<ProductsPage products={products} />);
    const searchInput = screen.getByPlaceholderText("Search Products...");

    // Enter search keyword
    searchInput.value = "product";
    fireEvent.change(searchInput, { target: { value: 'Product' } });

    // Get rendered product cards
    const productCards = screen.getAllByTestId("product-card");

    // Expect only matching products to be rendered
    expect(productCards.length).toBe(3);
  });
});
