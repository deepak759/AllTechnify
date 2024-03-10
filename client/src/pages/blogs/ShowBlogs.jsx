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
    <div>
      {!error ? (
        <div className="grid mx-10 mt-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 ">
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
