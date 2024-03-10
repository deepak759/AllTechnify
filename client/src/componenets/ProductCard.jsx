/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

export default function ProductCard({ item }) {
  const { imageURLs, productName, price, _id, desc } = item;

  return (
  
      <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <img
          className="pb-4 w-full rounded-t-lg"
          src={imageURLs}
          alt="product image"
        />

        <div className="px-5 pb-5">
          <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
            {productName}
          </h5>

          <div className="flex items-center mt-2.5 mb-5">
            <div className="flex items-center space-x-1 rtl:space-x-reverse">
              {desc}
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-3xl font-bold text-gray-900 dark:text-white">
              ${price}
            </span>
            <Link to={`/products/buy/${_id}`}>Buy Now</Link>
          </div>
        </div>
      </div>
   
  );
}