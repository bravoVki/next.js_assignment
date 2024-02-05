import { useParams } from "next/navigation";
const ProductDetail = () => {
  const params = useParams();
  console.log(params);
  if (params) return <div>hello products detaail {params.id}</div>;
};

export default ProductDetail;
