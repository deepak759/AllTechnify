import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function ReadBlog() {
  const params = useParams();
  const [error, setError] = useState(null);
  const [data, setData] = useState({});
  const id = params.id;
 
  useEffect(() => {
    const getBlog = async (id) => {
      try {
        const res = await fetch(`/api/blogs/getBlog/${id}`);
        const data = await res.json();
        if(data.success===false){
          setError(data.message)
        }
        console.log(data);
        setData(data);
      } catch (error) {
        setError(error);
      }
    };
    getBlog(id);
  }, [id]);
  return (
    <div className="w-[60%]  mt-5 mx-auto    justify-center">
    {!error?<> <div className="image">
        <img src={data.imageURLs} alt="" className="w-full" />
      </div>
      <div className="">
        <div className="font-bold my-3">{data.title}</div>
        <div className="">{data.desc}</div>
      </div></>:
      <div className="text-red-600"><p>Something Went Wrong, please try again later </p></div>
      }
    </div>
  );
}
