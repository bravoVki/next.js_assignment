import ProductDetails from "./details";
import { useParams } from "next/navigation";

const ProductDetail = () => {
  const params = useParams();
  return (
    <div>
      <ProductDetails id={params.id} />
    </div>
  );
};

export default ProductDetail;
