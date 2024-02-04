import { userAgentFromString } from "next/server";
import { useState, useEffect } from "react";
import Link from "next/link";
// Component for rendering each category button
const ProductCategory = ({ category, onClick }) => {
  return (
    <button
      onClick={() => onClick(category)} // Call fetchProductsByCategory with the selected category
      className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
    >
      {category}
    </button>
  );
};

// Component for rendering each product card
const Card = ({ product }) => {
  return (
    <Link
      className="bg-white rounded-lg shadow-lg p-4 m-4"
      href={`/products/${product.id}`}
    >
      <img
        src={product.thumbnail}
        alt={product.title}
        className="w-full h-48 object-cover"
      />
      <div className="mt-4">
        <h2 className="text-xl font-semibold">{product.title}</h2>
        <p className="text-gray-600">{product.description}</p>
        <div className="flex justify-between mt-4">
          <p className="text-gray-900 font-semibold">${product.price}</p>
          <p className="text-gray-600">{product.rating} stars</p>
        </div>
      </div>
    </Link>
  );
};

// Main component for rendering categories and products
const Products = () => {
  // State variables
  const [categories, setCategories] = useState([]); // Array to store fetched categories
  const [selectedCategory, setSelectedCategory] = useState(""); // Currently selected category
  const [products, setProducts] = useState([]); // Array to store fetched products

  // Fetch categories when component mounts
  useEffect(() => {
    fetch("https://dummyjson.com/products/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data || [])) // Initialize categories as an empty array if data.categories is undefined
      .catch((error) => console.error("Error fetching categories:", error));
  }, []);

  //to console the categories
  useEffect(() => {
    console.log(categories);
  }, [categories]);

  // Function to fetch products of a specific category
  const fetchProductsByCategory = (category) => {
    setSelectedCategory(category); // Set the selected category
    fetch(`https://dummyjson.com/products/category/${category}`)
      .then((res) => res.json())
      .then((data) => setProducts(data.products))
      .catch((error) => console.error("Error fetching products:", error));
  };

  return (
    <div>
      <h1>hello categories</h1>
      {/* Render category buttons */}
      <div className="flex justify-center my-4">
        {categories.map((category) => (
          <ProductCategory
            key={category}
            category={category}
            onClick={fetchProductsByCategory} // Pass fetchProductsByCategory as onClick handler
          />
        ))}
      </div>

      {/* Render selected category */}
      {selectedCategory && (
        <h2 className="text-center text-2xl font-semibold mb-4">
          Products in {selectedCategory} category
        </h2>
      )}

      {/* Render product cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 justify-center">
        {products.map((product) => (
          <Card key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Products;
