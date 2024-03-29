import { useEffect, useState } from "react";

import BlogCard from "../../componenets/BlogCard";
import ProductCard from "../../componenets/ProductCard";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

export default function UserProfile() {
  const params = useParams();
  const UserID = params.id;
  const { currentUser } = useSelector((state) => state.user);
  console.log(currentUser);
  const navigate = useNavigate();
  const [data, setData] = useState();
  const [product, setProducts] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [error, setError] = useState(null);
  const [isFollow, setFollow] = useState(null);
  const [showPostCategory, setShowPostCategory] = useState(blogs);

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await fetch(`/api/user/getUser/${UserID}`);
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
      const res = await fetch(`/api/blogs/getAllUserBlog/${UserID}`);
      const blog = await res.json();
      setBlogs(blog);

      console.log(showPostCategory);
    };
    const getUserProducts = async () => {
      const res = await fetch(`/api/product/getAllUserProduct/${UserID}`);
      const products = await res.json();
      setProducts(products);
    };
    getUserProducts();
    getUserBlogs();
  }, []);

  useEffect(() => {
    setShowPostCategory(product);
  }, [product]);

  const handleFollow = async () => {
    if (!currentUser) {
      navigate("/signin");
    }
    try {
      const res = await fetch(`/api/user/toggleFollow/${UserID}`);
      const data = await res.json();
      if (data.success == false) {
        console.log(data.message);
      } else {
        setFollow(!isFollow);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const checkFollow = async () => {
      try {
        const res = await fetch(`/api/user/getUser/${currentUser._id}`);
        const data = await res.json();
        const isfllow = data.followings.indexOf(UserID);
        if(isfllow!==-1)setFollow(true)
        else setFollow(false)
      } catch (error) {
        console.log(error);
      }
    };
    checkFollow();
  });

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
            <h1>{data.name.toUpperCase()}</h1>
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
          <div className="flex justify-center">
            <button
              className={`${
                !isFollow ? "bg-blue-700" : "bg-gray-600"
              } p-1 px-8 rounded-md`}
              onClick={handleFollow}
            >
              {isFollow ? "Following" : "Follow"}
            </button>
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
            <div className="font-bold  text-2xl flex items-center ">
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
