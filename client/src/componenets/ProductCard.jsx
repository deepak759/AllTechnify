/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

export default function ProductCard({ item }) {
  const { imageURLs, productName, price, _id, desc } = item;

  return (
  
      <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <img
          className="pb-4 w-full h-[270px] rounded-t-lg"
          src={imageURLs}
          alt="product image"
        />

        <div className="px-5 pb-5">
          <h5 className="text-xl h-20 font-semibold tracking-tight text-gray-900 dark:text-white">
            {productName}
          </h5>

          <div className="flex h-20 items-center mt-2.5 mb-5">
            <div className="flex items-center space-x-1 rtl:space-x-reverse">
              {desc}
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-3xl font-bold  text-white">
              ${price}
            </span>
            <Link className="bg-blue-600 p-3 rounded-md" to={`/products/detail/${_id}`}>Buy Now</Link>
          </div>
        </div>
      </div>
   
  );
}
