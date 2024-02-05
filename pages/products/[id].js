import { useRouter } from "next/router";
import ProductDetails from "./details";
import { useParams } from "next/navigation";

const ProductDetail = () => {
  const router = useRouter();
  // const { id } = router.query;
  const params = useParams();
  return (
    <div>
      {/* Pass the id prop to ProductDetails component */}
      <ProductDetails id={params.id} />
    </div>
  );
};

export default ProductDetail;
