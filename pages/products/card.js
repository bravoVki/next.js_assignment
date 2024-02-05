import { useState, useEffect } from "react";

const Card = ({ product }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-4 m-4">
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
    </div>
  );
};

const Products = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [cardsPerRow, setCardsPerRow] = useState(1);

  useEffect(() => {
    fetch(`https://dummyjson.com/products?_page=${page}&_limit=9`)
      .then((res) => {
        const totalProducts = parseInt(res.headers.get("X-Total-Count"));
        setTotalPages(Math.ceil(totalProducts / 9));
        return res.json();
      })
      .then((data) => setProducts(data.products))
      .catch((error) => console.error("Error fetching products:", error));
  }, [page]);

  useEffect(() => {
    const screenWidth = window.innerWidth;
    if (screenWidth < 640) {
      setCardsPerRow(1);
    } else if (screenWidth < 768) {
      setCardsPerRow(2);
    } else if (screenWidth < 1024) {
      setCardsPerRow(3);
    } else {
      setCardsPerRow(4);
    }

    const handleResize = () => {
      const screenWidth = window.innerWidth;
      if (screenWidth < 640) {
        setCardsPerRow(1);
      } else if (screenWidth < 768) {
        setCardsPerRow(2);
      } else if (screenWidth < 1024) {
        setCardsPerRow(3);
      } else {
        setCardsPerRow(4);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  const handlePrevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 justify-center">
        {products.map((product) => (
          <Card key={product.id} product={product} />
        ))}
      </div>

      <div className="flex justify-center mt-4">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
          onClick={handlePrevPage}
          disabled={page === 1}
        >
          Previous
        </button>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={handleNextPage}
          disabled={page === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Products;
