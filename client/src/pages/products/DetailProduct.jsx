import { useEffect, useState } from "react";
import RecommendList from "../../componenets/RecommendList";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaRegEdit } from "react-icons/fa";
export default function DetailProduct() {
  const params = useParams();
  const currentProductId = params.id;
  const [imgInd, setImgInd] = useState(0);
  const { currentUser } = useSelector((state) => state.user);
  const [error, setError] = useState(null);
  const [product, setProduct] = useState();
  

  useEffect(() => {
    const getProduct = async (id) => {
      try {
        const res = await fetch(`/api/product/getSpecProduct/${id}`);
        const data = await res.json();

        setProduct(data);
      } catch (error) {
        setError(error);
      }
    };
    getProduct(currentProductId);
  }, [currentProductId]);
  const img=product?.imageURLs

  useEffect(() => {
    const intervalId = setInterval(() => {
      setImgInd((prevImgInd) => (prevImgInd + 1) % 4);
    }, 3000);

    return () => clearInterval(intervalId);
  }, []);

  if (!product) return <div className="">Loading</div>;
  return (
    <>
      <div className="flex flex-col  md:flex-row mt-6  mx-4 md:mx-20 items-center lg:items-start justify-center">
        {product.userRef === currentUser?._id ? (
          <div className="absolute top-10 right-4 m-4">
          <Link
  className="text-3xl text-white hover:cursor-pointer   md:text-white p-3 rounded"
  to={`/edit-product/${currentProductId}`}
  title="Edit Product"
>
  <FaRegEdit/>
</Link>
          </div>
        ) : null}
        <div className="flex flex-col">
          <div className="">
            <img
              src={img[imgInd]}
              alt=""
              className="h-[400px] rounded-lg w-[400px] object-cover transition-opacity duration-500 ease-in-out"
            />
          </div>
          <div className="flex items-center justify-center space-x-3 mt-2">
            {img.map((image, index) => (
              <div
                key={index}
                onClick={() => setImgInd(index)}
                className="hover:cursor-pointer rounded-lg w-[60px] h-[60px]  overflow-hidden "
              >
                <img
                  src={image}
                  className="object-cover w-full h-full"
                  alt=""
                />
              </div>
            ))}
          </div>
        </div>
        <div className="w-[70%] md:w-[60%] lg:w-[50%]   lg:mt-10   md:ml-4">
        

          <h1 className="font-bold text-3xl mb-2">{product.productName}</h1>
          <p className="mb-4 text-gray-200">
           {product.desc}
          </p>
       
          <div className="mb-4">
            <h1 className="text-lg">
              Price: <span className="text-green-500 font-bold">${product.price}</span>
            </h1>
            <h1 className="text-lg">
              Stocks left: <span className="text-blue-500 font-bold">{product.stock}</span>
            </h1>
            <h1 className="text-lg">
              Reviews: <span className="text-yellow-500 font-bold">{product.review.length}</span>
            </h1>
          </div>
          <div className="flex  space-x-4">
            <button className="bg-blue-700 px-4 py-2 rounded-full transition duration-300 ease-in-out hover:bg-gray-600">
              Add to Cart
            </button>
            <Link to={`/products/buy`} className="bg-blue-700 px-4 py-2 rounded-full transition duration-300 ease-in-out hover:bg-gray-600">
              Buy Now
            </Link>
          </div>
        </div>
      </div>
      <RecommendList text="recommended" />
    </>
  );
}
