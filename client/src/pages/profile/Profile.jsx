import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import BlogCard from "../../componenets/BlogCard";
import ProductCard from "../../componenets/ProductCard";

export default function Profile() {
  const { currentUser } = useSelector((state) => state.user);
  const [data, setData] = useState();
  const [product, setProducts] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [error, setError] = useState(null);
  const [showPostCategory, setShowPostCategory] = useState(blogs);

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await fetch(`/api/user/getUser/${currentUser._id}`);
        const user = await res.json();
        if (user.success == false) {
          setError(user.message);
        }
        setData(user);
      } catch (error) {
        setError(error);
      }
    };
    getUser();
  }, []);

  useEffect(() => {
    const getUserBlogs = async () => {
      const res = await fetch(`/api/blogs/getAllMyBlog`);
      const blog = await res.json();
      setBlogs(blog);

      console.log(showPostCategory);
    };
    const getUserProducts = async () => {
      const res = await fetch(`/api/product/getAllMyProduct`);
      const products = await res.json();
      setProducts(products);
    };
    getUserProducts();
    getUserBlogs();
  }, []);

  useEffect(() => {
    setShowPostCategory(product);
  }, [product]);

  console.log(showPostCategory);
  if (!data) return <div className="">Loading</div>;
  return (
    <div className=" w-[90%] md:w-[70%] mt-4 mx-auto">
      <div className="flex flex-col  md:flex-row  justify-center items-center ">
        <div className=" md:mr-4  w-[30%] md:w-[15%] lg:w-[10%] md:mb-0">
          <img
            src={data.avatar}
            alt="profile pic"
            className="rounded-full  aspect-square "
          />
        </div>
        <div className="flex flex-col mx-2 gap-y-6">
          <div className="font-bold mt-2 text-2xl text-center">
            <h1>{data.name}</h1>
          </div>
          <div className="flex gap-x-4">
            <div>
              <span className="font-bold">{data.followers.length}</span>{" "}
              followers
            </div>
            <div>
              <span className="font-bold">{data.followings.length}</span>{" "}
              Followings
            </div>
            <div>
              <span className="font-bold">{data.products}</span> Posts
            </div>
            <div>
              <span className="font-bold">{data.blogs}</span> Blogs
            </div>
          </div>
        </div>
      </div>
      <div className="mt-20 ">
        <div className="flex bg-black  justify-around">
          <div
            className="hover:cursor-pointer w-[50%] text-center bg-gray-900 p-2 hover:bg-gray-800  transition duration-300 ease-in-out"
            onClick={() => setShowPostCategory(product)}
          >
            Products
          </div>
          <div
            className="hover:cursor-pointer w-[50%] text-center hover:bg-gray-800  transition duration-300 ease-in-out"
            onClick={() => setShowPostCategory(blogs)}
          >
            Blogs
          </div>
        </div>

        <div className="grid sm1:grid-cols-2 justify-center sm2:grid-cols-3 mt-4 gap-4">
          {showPostCategory.length > 0 ? (
            showPostCategory.map((item, index) => (
              <div key={index} className="relative  ">
                {showPostCategory === blogs ? (
                  <BlogCard item={item} />
                ) : (
                  <ProductCard item={item} />
                )}
              </div>
            ))
          ) : (
            <div className="font-bold h-[50vh] text-2xl flex items-center ">
              <div className="flex justify-normal">
                <h1 className="text-center">
                  No {showPostCategory === blogs ? "Blogs" : "Products"}{" "}
                  Uploaded yet
                </h1>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
