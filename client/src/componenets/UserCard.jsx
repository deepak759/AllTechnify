/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

export default function UserCard({ item }) {
  const { name, avatar, follwers,_id } = item;
  const { currentUser } = useSelector((state) => state.user);
  console.log(currentUser);
  const navigate = useNavigate();

  const [isFollow, setFollow] = useState(null);
  const handleFollow = async () => {
    if (!currentUser) {
      navigate("/signin");
    }
    try {
      const res = await fetch(`/api/user/toggleFollow/${_id}`);
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
        const isfllow = data.followings.indexOf(_id);
        if(isfllow!==-1)setFollow(true)
        else setFollow(false)
      } catch (error) {
        console.log(error);
      }
    };
    checkFollow();
  });

  return (
    <div className="w-full p-4 max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <div className="flex flex-col items-center pb-2">
        <img
          className="w-24 h-24 mb-3 rounded-full shadow-lg"
          src={avatar}
          alt="Bonnie image"
        />
        <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
          {name}
        </h5>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          {follwers || 0} Followers
        </span>
        <div className="flex mt-4 md:mt-6">
        <button
              className={`${
                !isFollow ? "bg-blue-700" : "bg-gray-600"
              } p-1 px-8 rounded-md`}
              onClick={handleFollow}
            >
              {isFollow ? "Following" : "Follow"}
            </button>
          <Link
            to={`/profile/${_id}`}
            className="py-2 px-4 ms-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
          >
            View Profile
          </Link>
        </div>
      </div>
    </div>
  );
}
