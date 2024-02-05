import { useState, useEffect } from "react";
import Card from "../components/card";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [cardsPerRow, setCardsPerRow] = useState(1);
  const [email, setEmail] = useState("");

  useEffect(() => {
    const emailFromStorage = localStorage.getItem("email");
    setEmail(emailFromStorage);
    fetch(`https://dummyjson.com/products?skip=${page}`)
      .then((res) => {
        const totalProducts = parseInt(res.headers.get("X-Total-Count"));
        setTotalPages(Math.ceil(totalProducts / 10));
        return res.json();
      })
      .then((data) => setProducts(data.products))
      .catch((error) => console.error("Error fetching products:", error));
  }, [page]);

  const handleNextPage = () => {
    setPage(page + 10);
  };

  const handlePrevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  return (
    <div>
      {email && (
        <b>
          <p>Logged in as: {email}</p>
        </b>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 justify-center">
        {products.map((product) => (
          <Card key={product.id} product={product} />
        ))}
      </div>

      <div className="flex  items-center justify-between   fixed bottom-16 left-1/2">
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
