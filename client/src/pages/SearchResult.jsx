import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

export default function SearchResult() {
  const params = useParams();
  const queryTerm = params.searchTerm;
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);
  const [showingData, setShowingData] = useState([]);
  const [activeButtonIndex, setActiveButtonIndex] = useState(0); // State to track active button index

  useEffect(() => {
    const getSearchRes = async (queryTerm) => {
      try {
        const res = await fetch(`/api/search?searchTerm=${queryTerm}`);
        const resdata = await res.json();
        setData(resdata.data);
      } catch (error) {
        setError(error);
      }
    };
    getSearchRes(queryTerm);
  }, [queryTerm]);

  useEffect(() => {
    setShowingData(data[0]); // Update showingData after data has been updated
  }, [data]);

  console.log(showingData);

  if (data.length === 0) {
    return <div>Loading...</div>;
  }

  const handleButtonClick = (index) => {
    setActiveButtonIndex(index); // Update active button index when button is clicked
    setShowingData(data[index]); // Set showingData based on the clicked button
  };

  return (
    <div className="mt-6 ">
      {!error ? (
        <div className="min-h-[70vh]">
          <h1>Search result for: {queryTerm}</h1>
          <h1>Found</h1>
          <div className="bg-black mt-4 w-full justify-around flex">
            {data.map((item, index) => (
              <button
                key={index}
                onClick={() => handleButtonClick(index)}
                className={`hover:cursor-pointer w-full py-4 ${
                  activeButtonIndex === index ? 'bg-gray-700' : 'bg-gray-900'
                }`}
              >
                {index==0?"Blogs":index==1?"Products":"Users"} ({item.length || 0})
              </button>
            ))}
          </div>
          <div className="">
            {showingData?.length > 0 ? (
              <div className="">
                {showingData.map((item) => {
                  return (
                    <div className="" key={item._id}>
                      {item._id}
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="">Not Found Any Data For Your search</div>
            )}
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-[70vh]">
          <p className="text-red-800 mb-4">Some Error Occurred</p>
          <Link to="/" className="bg-blue-700 text-white px-4 py-3 rounded-md">
            Go Home
          </Link>
        </div>
      )}
    </div>
  );
}
