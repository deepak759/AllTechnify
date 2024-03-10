import { useEffect, useState } from "react";
import ProductCard from "../../componenets/ProductCard";

export default function ShowProducts() {
  const [products, setProducts] = useState([]); // Set initial state to null
  const [error, setError] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await fetch("/api/product/getAllProduct");
        const data = await res.json();
        if (data.success === false) {
          setError(data.message);
          return;
        }
        setProducts(data);
      } catch (error) {
        setError(error);
      }
    };
    getData();
  }, []);
console.log(products)
  return (
    <div>
      {!error ? (
        products !== null ? ( // Check if products is not null before mapping
          <div className="grid mx-10 mt-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {products.map((item) => (
              <ProductCard key={item._id} item={item} />
            ))}
          </div>
        ) : (
          <div>Loading...</div>
        )
      ) : (
        <div className="text-red-500">Something Went Wrong</div>
      )}
    </div>
  );
}
