import { useState, useEffect } from "react";
import Card from "../components/card";

// Component for rendering each category button
const ProductCategory = ({ category, onClick, selectedCategory, isFirst }) => {
  const isSelected =
    selectedCategory === category || (isFirst && selectedCategory === "");
  useEffect(() => {
    if (isFirst) {
      onClick(category);
    }
  }, []);
  return (
    <button
      onClick={() => onClick(category)}
      className={`text-black  rounded ml-5 mr-3 p-1 m-1 max-w-xs ${
        isSelected ? "bg-green-700" : "bg-green-400" //change the color when selected
      }`}
    >
      {category}
    </button>
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

  // Function to fetch products of a specific category
  const fetchProductsByCategory = (category) => {
    setSelectedCategory(category); // Set the selected category
    fetch(`https://dummyjson.com/products/category/${category}`)
      .then((res) => res.json())
      .then((data) => setProducts(data.products))
      .catch((error) => console.error("Error fetching products:", error));
  };

  return (
    <div className="flex flex-col lg:flex-row">
      <div className="lg:w-1/10">
        {/* Category buttons */}
        <div className="flex flex-col">
          {categories.map((category) => (
            <ProductCategory
              key={category}
              category={category}
              onClick={fetchProductsByCategory} // Pass fetchProductsByCategory as onClick handler
              selectedCategory={selectedCategory}
            />
          ))}
        </div>
      </div>
      <div className="lg:w-4/5">
        {/* Product cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 justify-center">
          {products.map((product) => (
            <Card key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Products;
