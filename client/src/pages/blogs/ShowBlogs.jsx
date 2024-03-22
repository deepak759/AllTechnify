import { useEffect, useState } from "react";
import BlogCard from "../../componenets/BlogCard";

export default function ShowBlogs() {
  const [allBlogs, setAllBlogs] = useState([]);
  const [error, setError] = useState(null);
  useEffect(() => {
    const getAllBlogs = async () => {
      try {
        const res = await fetch("/api/blogs/getAllBlog");
        const data = await res.json();
        if (data.success === false) {
          setError(data.message);
          return;
        }
        setAllBlogs(data);
      } catch (error) {
        setError(error);
      }
    };
    getAllBlogs();
  }, []);

  return (
    <div className="flex justify-center items-center mx-4 mt-10 h-full">
      {!error ? (
        <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 gap-10 ">
          {allBlogs.map((item) => (
            <BlogCard key={item._id} item={item} />
          ))}
        </div>
      ) : (
        <div className="text-red-500">Something Went Wrong</div>
      )}
    </div>
  );
}
