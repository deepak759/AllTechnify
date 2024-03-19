import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

export default function Header() {
  const { currentUser } = useSelector((state) => state.user);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const [searchText, setSearchText] = useState("");
  const navigate = useNavigate();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const url = `/search/${searchText}`;
    setSearchText("");
    navigate(url);
  };

  const handleOutsideClick = (e) => {
    if (menuRef.current && !menuRef.current.contains(e.target)) {
      setMenuOpen(false);
    }
  };
  useEffect(() => {
    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);
  return (
    <div className=" ">
      <div className="lg:hidden z-10 flex justify-between items-center p-2 bg-[#1f2937] text-white">
        <div className="flex items-center">
          <div className="flex  items-center font-bold">
            <img src="/Applogo.png" className="h-10 pb-1" alt="logo" />
            <Link to="/" className="no-underline">
              AllTechnify
            </Link>
          </div>
        </div>
        <form action="submit" onSubmit={handleSearchSubmit}>
          <div className="flex">
            <input
              type="text"
              required
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              placeholder="Search Blogs, Posts, Users..."
              className="p-1 px-4 rounded-full mx-4 bg-[#374151] w-full"
            />
          </div>
        </form>
        <div className="" ref={menuRef}>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-xl focus:outline-none"
          >
            &#9776;
          </button>
          {menuOpen && (
            <div className="lg:hidden w-[80%] h-[80%] z-10  absolute top-14 left-0 bg-[#263447] text-white p-2">
              <nav>
                <ul className="flex flex-col text-2xl text-gray-300 space-y-8 list-none items-left m-8 p-0">
                  <li className="mb-2">
                    <Link to="/blogs" className="no-underline hover:underline ">
                      Blogs
                    </Link>
                  </li>
                  <li className="mb-2">
                    <Link
                      to="/products"
                      className="no-underline hover:underline "
                    >
                      Products
                    </Link>
                  </li>
                  <li className="mb-2">
                    <Link
                      to="/create-blog"
                      className="no-underline hover:underline "
                    >
                      Write Blog
                    </Link>
                  </li>
                  <li className="mb-2">
                    <Link
                      to="/create-product"
                      className="no-underline hover:underline "
                    >
                      Add Products
                    </Link>
                  </li>
                  <li className="mb-2">
                    {currentUser ? (
                      <Link
                        to="/profile"
                        className="no-underline hover:underline "
                      >
                        Go to Profile
                      </Link>
                    ) : (
                      <Link
                        to="/signin"
                        className="no-underline hover:underline "
                      >
                        Login
                      </Link>
                    )}
                  </li>
                </ul>
              </nav>
            </div>
          )}
        </div>
      </div>

      <div className="hidden lg:flex justify-between items-center p-2 bg-[#1f2937] text-white">
        <div className="flex items-center">
          <div className="flex text-2xl items-center font-bold">
            <img src="/Applogo.png" className="h-12 pb-1" alt="logo" />
            <Link to="/" className="no-underline">
              AllTechnify
            </Link>
          </div>
          <div>
          <form action="submit" onSubmit={handleSearchSubmit}>
          <div className="flex">
          <input
              type="text"
              required
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              placeholder="Search Blogs, Posts, Users..."
              className="p-1 px-4 rounded-full mx-4 bg-[#374151] w-full"
            />
          </div>
        </form>
          </div>
        </div>
        <div className="flex items-center">
          <nav>
            <ul className="flex list-none items-center m-0 p-0">
              <li className="mr-4">
                <Link to="/blogs" className="no-underline hover:underline">
                  Blogs
                </Link>
              </li>
              <li className="mr-4">
                <Link to="/products" className="no-underline hover:underline">
                  Products
                </Link>
              </li>
              <li className="mr-4">
                <Link
                  to="/create-blog"
                  className="no-underline hover:underline"
                >
                  Write Blog
                </Link>
              </li>
              <li className="mr-4">
                <Link
                  to="/create-product"
                  className="no-underline hover:underline"
                >
                  Add Products
                </Link>
              </li>
              <li className="mr-4">
                {currentUser ? (
                  <Link to="/profile">
                    <img
                      src={currentUser.avatar}
                      className="w-8 h-8 rounded-full"
                      alt=""
                    />
                  </Link>
                ) : (
                  <Link to="/signin" className="no-underline hover:underline">
                    Login
                  </Link>
                )}
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
}
