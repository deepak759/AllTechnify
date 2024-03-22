import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import Comments from "../../componenets/Comments";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { FaRegEdit } from "react-icons/fa";

export default function ReadBlog() {
  const params = useParams();
  const [error, setError] = useState(null);
  const [commentdata, setCommentData] = useState();
  const [commentrror, setCommentError] = useState(null);
  const [data, setData] = useState();
  const { currentUser } = useSelector((state) => state.user);

  const id = params.id;

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!currentUser) {
      setCommentError("Please Login to comment");
    } else {
      try {
        const res = await fetch(`/api/blogs/comment/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "Application/json",
          },
          body: JSON.stringify({
            content: commentdata,
            userRef: currentUser._id,
            userName: currentUser.name,
            avatar: currentUser.avatar,
          }),
        });
        const newComment = await res.json();
        if (newComment.success === false) {
          setCommentError(newComment.message);
          return;
        }
        setCommentData("");
        setCommentError(null);
      } catch (error) {
        setCommentError("something went wrong");
      }
    }
  };

  useEffect(() => {
    const getBlog = async (id) => {
      try {
        const res = await fetch(`/api/blogs/getBlog/${id}`);
        const data = await res.json();
        if (data.success === false) {
          setError(data.message);
        }
        await data.desc.replace("\n", "<br>");
        setData(data);
      } catch (error) {
        setError(error);
      }
    };
    getBlog(id);
  }, [id, commentdata]);


  if (!data) {
    return <div>Loading...</div>; // Display a loading indicator
  }
  return (
    <div className="w-[90%] md:w-[60%]  mt-5 mx-auto    justify-center">
      {!error ? (
        <>
          <div className="image">
            {data.userRef === currentUser?._id ? (
              <div className="absolute z-10 top-10 right-4 m-4">
                <Link
                  className="text-3xl  hover:cursor-pointer   md:text-white p-3 rounded"
                  to={`/edit-blog/${id}`}
                  title="Edit Product"
                >
                  <FaRegEdit />
                </Link>
              </div>
            ) : null}
            <Carousel
              autoPlay
              interval={3000}
              showArrows={false}
              showStatus={false}
              showThumbs={false}
              infiniteLoop
              transitionTime={0}
            >
              {data.imageURLs.map((item) => {
                return (
                  <div className="" key={item}>
                    <img src={item} alt="" className="w-full" />
                  </div>
                );
              })}
            </Carousel>
          </div>
          <div className="" style={{ whiteSpace: 'pre-line' }}  >
            <div className="font-bold my-3">{data.title}</div>
            <div className="">{data.desc}</div>
          </div>
          <form onSubmit={handleCommentSubmit} className="my-8">
            <label htmlFor="chat" className="sr-only">
              Your message
            </label>
            <div className="flex items-center px-3 py-2 rounded-lg bg-gray-50 dark:bg-gray-700">
              <textarea
                id="chat"
                rows="1"
                value={commentdata}
                onChange={(e) => setCommentData(e.target.value)}
                className="block mx-4 p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Your message..."
                required
              />
              <button
                type="submit"
                className="inline-flex justify-center p-2 text-blue-600 rounded-full cursor-pointer hover:bg-blue-100 dark:text-blue-500 dark:hover:bg-gray-600"
              >
                <svg
                  className="w-5 h-5 rotate-90 rtl:-rotate-90"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 18 20"
                >
                  <path d="m17.914 18.594-8-18a1 1 0 0 0-1.828 0l-8 18a1 1 0 0 0 1.157 1.376L8 18.281V9a1 1 0 0 1 2 0v9.281l6.758 1.689a1 1 0 0 0 1.156-1.376Z" />
                </svg>
                <span className="sr-only">Send message</span>
              </button>
            </div>
            {commentrror ? <p className="text-red-500">{commentrror}</p> : ""}
          </form>
          {data.comments &&
            data.comments.map((item) => (
              <Comments key={item._id} comment={item} />
            ))}
        </>
      ) : (
        <div className="text-red-600">
          <p>Something Went Wrong, please try again later </p>
        </div>
      )}
    </div>
  );
}
