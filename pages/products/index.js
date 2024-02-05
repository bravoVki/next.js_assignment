import { useRouter } from "next/router";

const ProductsPage = () => {
  const router = useRouter();
  const { email } = router.query; // Access the email parameter from the query object

  return (
    <div>
      <h1>Welcome to the Products Page</h1>
      {email && <p>Logged in as: {email}</p>}
      {/* Other content of the products page */}
    </div>
  );
};

export default ProductsPage;
