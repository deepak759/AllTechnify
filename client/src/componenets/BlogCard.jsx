/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

export default function BlogCard({ item }) {
  let { imageURLs, title, desc,_id, createdAt} = item;
  title = title.substring(0, 45);
  createdAt = createdAt.substring(0, 10);
  desc = desc.substring(0, 100);
  return (
   
    <div className="max-w-[400px]  bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
     
        <img
          className="rounded-t-lg h-[250px] w-full"
          src={imageURLs}
          alt=""
        />
      
      <div className="p-5">
        <h2><span className="text-gray-400">Created: </span> {createdAt}</h2>
          <h5 className="mb-2 mt-2 text-2xl h-20 font-bold tracking-tight text-gray-900 dark:text-white">
          {title}...
          </h5>
       
        <p className="mb-3 h-20 font-normal text-gray-700 dark:text-gray-400">
         {desc}...
        </p>
        <Link
          to={`/blogs/read/${_id}`}
          className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Read more
          <svg
            className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 10"
          >
            <path
              stroke="currentColor"
             
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 5h12m0 0L9 1m4 4L9 9"
            />
          </svg>
        </Link>
      </div>
    </div>
  );
}
