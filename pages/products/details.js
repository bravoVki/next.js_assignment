import { useState, useEffect } from "react";
import StarsRating from "../components/ratings";

const ProductDetails = ({ id }) => {
  const [product, setProduct] = useState(null);
  console.log(id);
  useEffect(() => {
    if (!id) return;

    fetch(`https://dummyjson.com/products/${id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data))
      .catch((error) => console.error("Error fetching product:", error));
  }, [id]);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Main Content */}
      <div className="flex-1 container mx-auto py-10">
        <h1 className="text-5xl text-center underline mb-5">
          Products Details
        </h1>
        {product ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Product Image */}
            <div className="col-span-1 ml-10 mr-10">
              <img
                src={product.thumbnail}
                alt={product.title}
                className="w-full h-auto rounded-lg shadow-lg"
              />
            </div>
            {/* Product Details */}
            <div className="col-span-1">
              <h1 className="text-3xl font-semibold">{product.title}</h1>
              <p className="text-lg text-gray-600 mt-2">
                {product.description}
              </p>
              <div className="flex flex-col mt-4">
                <div className="flex items-center">
                  <span className="text-gray-800 font-semibold">Price:</span>
                  <span className="text-lg text-green-600 ml-2">
                    ${product.price}
                  </span>
                </div>
                <div className="flex items-center mt-2">
                  <span className="text-gray-800 font-semibold">Ratings:</span>
                  <div className="flex items-center mt-4">
                    <span className="text-lg text-yellow-500 ml-2">
                      {product.rating} stars:{" "}
                      <StarsRating rating={product.rating} />
                    </span>
                  </div>
                </div>
                <div className="flex items-center mt-2">
                  <span className="text-gray-800 font-semibold">Stock:</span>
                  <span className="text-lg text-blue-600 ml-2">
                    {product.stock} units
                  </span>
                </div>
                <div className="flex items-center mt-2">
                  <span className="text-gray-800 font-semibold">Brand:</span>
                  <span className="text-lg ml-2">{product.brand}</span>
                </div>
                <div className="flex items-center mt-2">
                  <span className="text-gray-800 font-semibold">Category:</span>
                  <span className="text-lg ml-2">{product.category}</span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <p className="text-center">Loading...</p>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;
