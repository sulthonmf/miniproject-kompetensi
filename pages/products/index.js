import axios from "axios";
import { Layout } from "components/Layout";
import { ProductCard } from "components/ProductCard";
import { Dropdown } from "flowbite-react";
import { useEffect, useState } from "react";

function ProductsPage({ products = [] }) {
  const [sortingOption, setSortingOption] = useState("");
  const [sortedProducts, setSortedProducts] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("");

  useEffect(() => {
    setSortedProducts([...products]); // Initialize sortedProducts with original products
  }, [products]);

  useEffect(() => {
    sortProducts();
  }, [sortingOption, searchKeyword]);

  const sortProducts = () => {
    if (sortingOption === "az") {
      const sorted = [...sortedProducts].sort((a, b) =>
        a.name.localeCompare(b.name)
      );
      setSortedProducts(sorted);
    } else if (sortingOption === "za") {
      const sorted = [...sortedProducts].sort((a, b) =>
        b.name.localeCompare(a.name)
      );
      setSortedProducts(sorted);
    }
  };

  const renderProducts = () => {
    let filteredProducts = sortedProducts; // Initialize filteredProducts with sortedProducts

  if (searchKeyword) {
    filteredProducts = filteredProducts.filter((product) =>
      product.name.toLowerCase().includes(searchKeyword.toLowerCase())
    );
  }

  if (filteredProducts.length === 0) return <h1>No Products</h1>;
  return filteredProducts.map((product) => (
    <ProductCard key={product.id} product={product} />
  ));
  };

  return (
    <Layout>
      <form>
        <label
          htmlFor="default-search"
          className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
        >
          Search
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg
              aria-hidden="true"
              className="w-5 h-5 text-gray-500 dark:text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              ></path>
            </svg>
          </div>
          <input
            type="search"
            id="default-search"
            className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search Mockups, Logos..."
            value={searchKeyword} // Add this line
            onChange={(e) => setSearchKeyword(e.target.value)} // Add this line
            required
          />
          <button
            type="submit"
            className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Search
          </button>
        </div>
      </form>

      <div className="flex my-5">
        <Dropdown label="Sort By" style={{ backgroundColor: "#1d4ed8" }}>
          <Dropdown.Item onClick={() => setSortingOption("az")}>
            A - Z
          </Dropdown.Item>
          <Dropdown.Item onClick={() => setSortingOption("za")}>
            Z - A
          </Dropdown.Item>
        </Dropdown>
      </div>

      <div className="grid gap-4 grid-cols-1 md:grid-cols-4">
        {renderProducts()}
      </div>
    </Layout>
  );
}

export default ProductsPage;

export const getServerSideProps = async () => {
  const { data: products } = await axios.get(
    "http://localhost:3000/api/products"
  );

  return {
    props: {
      products,
    },
  };
};
