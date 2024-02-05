// import ProductDetails from "./details";
// import { useParams } from "next/navigation";

// const ProductDetail = () => {
//   const params = useParams();
//   return (
//     <div>
//       <ProductDetails id={params.id} />
//     </div>
//   );
// };

// export default ProductDetail;

import ProductDetails from "./details";
import { useRouter } from "next/router";

const ProductDetailsPage = () => {
  const router = useRouter();
  const { id } = router.query;

  // Check if id is available
  if (!id) {
    return <div>Loading...</div>; // Or display an error message
  }

  return (
    <div>
      <ProductDetails id={id} />
    </div>
  );
};

export default ProductDetailsPage;
