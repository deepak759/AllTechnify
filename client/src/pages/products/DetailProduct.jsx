import { useEffect, useState } from "react";
import RecommendList from "../../componenets/RecommendList";

export default function DetailProduct() {
  const [imgInd, setImgInd] = useState(3);
  const img = [
    "https://images.pexels.com/photos/1321909/pexels-photo-1321909.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/1468379/pexels-photo-1468379.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/1386604/pexels-photo-1386604.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/1308881/pexels-photo-1308881.jpeg?auto=compress&cs=tinysrgb&w=600",
  ];

  useEffect(() => {
    const intervalId = setInterval(() => {
      setImgInd((prevImgInd) => (prevImgInd + 1) % 4);
    }, 3000);

    return () => clearInterval(intervalId);
  }, [imgInd]);

  return (
    <>
    <div className="flex flex-col  md:flex-row mt-6  mx-4 md:mx-20 items-center justify-center">
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
              className="hover:cursor-pointer rounded-lg w-[60px] h-[60px] md:w-[90px] md:h-[90px] overflow-hidden "
            >
              <img src={image} className="object-cover w-full h-full" alt="" />
            </div>
          ))}
        </div>
      </div>
      <div className="w-[100%] md:w-[60%] lg:w-[50%]  mt-4 md:mt-10  md:ml-4">
        <h1 className="font-bold text-3xl mb-2">Apple Watch 200</h1>
        <p className="mb-4 text-gray-200">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Saepe consectetur, culpa, voluptatem nostrum non ad quam aliquam labore dolor deleniti dolore animi error, quisquam officiis facere! Distinctio, optio sed. Dignissimos.
        </p>
        <div className="mb-4">
          <h1 className="text-lg">Price: <span className="text-green-500 font-bold">$200</span></h1>
          <h1 className="text-lg">Stocks left: <span className="text-blue-500 font-bold">300</span></h1>
          <h1 className="text-lg">Review: <span className="text-yellow-500 font-bold">400</span></h1>
        </div>
        <div className="flex  space-x-4">
          <button className="bg-blue-700 px-4 py-2 rounded-full transition duration-300 ease-in-out hover:bg-gray-600">
            Add to Cart
          </button>
          <button className="bg-blue-700 px-4 py-2 rounded-full transition duration-300 ease-in-out hover:bg-gray-600">
            Buy Now
          </button>
        </div>
      </div>
    </div>
      <RecommendList text="recommended"/></>
  );
}
