import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function Profile() {
  const {currentUser}=useSelector((state)=>state.user)
  const [data,setData]=useState()
  const [error,setError]=useState(null)
  console.log(currentUser)
useEffect(()=>{
  const getUser=async()=>{
    try {
      
      const res=await fetch(`/api/user/getUser/${currentUser._id}`)
      const user=await res.json()
      if(user.success==false){
        setError(user.message)
      }
      setData(user)
    } catch (error) {
      setError(error)
    }
  }
  getUser();
},[])
  const productURLs = [
    "https://images.pexels.com/photos/1321909/pexels-photo-1321909.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/1468379/pexels-photo-1468379.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/1386604/pexels-photo-1386604.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/1308881/pexels-photo-1308881.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/1321909/pexels-photo-1321909.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/1468379/pexels-photo-1468379.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/1386604/pexels-photo-1386604.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/1308881/pexels-photo-1308881.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/1321909/pexels-photo-1321909.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/1468379/pexels-photo-1468379.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/1386604/pexels-photo-1386604.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/1308881/pexels-photo-1308881.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/1321909/pexels-photo-1321909.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/1468379/pexels-photo-1468379.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/1386604/pexels-photo-1386604.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/1308881/pexels-photo-1308881.jpeg?auto=compress&cs=tinysrgb&w=600",
  ];
  const blogURLs = [
    "https://images.pexels.com/photos/1386604/pexels-photo-1386604.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/1308881/pexels-photo-1308881.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/1321909/pexels-photo-1321909.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/1468379/pexels-photo-1468379.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/1321909/pexels-photo-1321909.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/1468379/pexels-photo-1468379.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/1386604/pexels-photo-1386604.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/1308881/pexels-photo-1308881.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/1321909/pexels-photo-1321909.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/1468379/pexels-photo-1468379.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/1386604/pexels-photo-1386604.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/1308881/pexels-photo-1308881.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/1321909/pexels-photo-1321909.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/1468379/pexels-photo-1468379.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/1386604/pexels-photo-1386604.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/1308881/pexels-photo-1308881.jpeg?auto=compress&cs=tinysrgb&w=600",
  ];
  const [showPostCategory,setShowPostCategory]=useState(productURLs)
  if(!data) return <div className="">Loading</div>
  return (
    <div className=" w-[90%] md:w-[70%] mt-4 mx-auto">
      <div className="flex  h-[20%] flex-col md:flex-row  justify-center items-center ">
        <div className=" md:mr-4  w-[20%] md:w-[15%] md:mb-0">
          <img
            src="https://images.pexels.com/photos/1130624/pexels-photo-1130624.jpeg?auto=compress&cs=tinysrgb&w=600"
            alt="profile pic"
            className="rounded-full  aspect-square "
          />
        </div>
        <div className="flex flex-col md:w-[70%] my-auto md:ml-4">
          <div className="flex justify-around  ">
            <div className="mb-2 md:mb-0 md:mr-6 text-center">
              <h1 className="text-lg font-bold text-gray-200">{data.followers.length}</h1>
              <h1 className="text-sm text-gray-500">Followers</h1>
            </div>
            <div className="mb-2 md:mb-0 md:mr-6 text-center">
              <h1 className="text-lg font-bold  text-gray-200">{data.followings.length}</h1>
              <h1 className="text-sm text-gray-500">Following</h1>
            </div>
            <div className="mb-2 md:mb-0 md:mr-6 text-center">
              <h1 className="text-lg font-bold text-gray-200">{data.blogs}</h1>
              <h1 className="text-sm text-gray-500">Blogs</h1>
            </div>
            <div className="text-center">
              <h1 className="text-lg font-bold text-gray-200">{data.products}</h1>
              <h1 className="text-sm text-gray-500">Products</h1>
            </div>
          </div>
          <div className="md:ml-6">
            <div className="bg-gray-600 text-white text-center py-2 rounded-md mb-2">
              <h1 className="text-lg font-bold">{data.name}</h1>
            </div>
            
          </div>
        </div>
      </div>
      <div className="mt-20">
  <div className="flex bg-black  justify-around">
    <div className="hover:cursor-pointer w-[50%] text-center bg-gray-900 p-2 hover:bg-gray-800  transition duration-300 ease-in-out" onClick={() => setShowPostCategory(productURLs)}>Posts</div>
    <div className="hover:cursor-pointer w-[50%] text-center hover:bg-gray-800  transition duration-300 ease-in-out" onClick={() => setShowPostCategory(blogURLs)}>Blogs</div>
  </div>

  <div className="grid grid-cols-3 gap-2">
    {showPostCategory.map((item, index) => (
      <div key={index} className="relative h-[200px] md:h-[450px]">
        <img src={item} alt="" className="w-full block object-cover h-full" />
      </div>
    ))}
  </div>
</div>

    </div>
  );
}
