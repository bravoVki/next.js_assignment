import Link from "next/link";
import StarsRating from "./ratings";

const Card = ({ product }) => {
  return (
    <Link
      href={`/products/${product.id}`}
      className="bg-white rounded-lg shadow-lg p-4 m-4"
    >
      <img
        src={product.thumbnail}
        alt={product.title}
        className="w-full h-48 object-cover"
      />
      <div className="mt-4">
        <h2 className="text-xl font-semibold">Title: {product.title}</h2>
        <p className="text-gray-600">
          <b>Desc: </b>
          {product.description}
        </p>
        <div className="flex justify-between mt-4">
          <p className="text-gray-900 font-semibold">Price: ${product.price}</p>
          <p className="text-gray-600">
            {product.rating} stars:
            <StarsRating rating={product.rating} />{" "}
          </p>
        </div>
      </div>
    </Link>
  );
};
export default Card;
