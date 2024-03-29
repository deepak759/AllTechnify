import { useEffect, useState } from "react";
import RecommendList from "../componenets/RecommendList";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
const Home = () => {
  const bannerImages = [
    "https://img.freepik.com/free-vector/abstract-blue-light-pipe-speed-zoom-black-background-technology_1142-8392.jpg",
    "https://img.freepik.com/premium-photo/futuristic-dark-background-ripple-effect-web-blue-dots-big-data-illustration-technologies-artificial-intelligence-effect-particle-oscillation-3d-rendering_710001-328.jpg",
    "https://img.freepik.com/free-vector/abstract-blue-light-pipe-speed-zoom-black-background-technology_1142-9120.jpg",
  ];
  const [products,setProducts]=useState()
  const [blogs,setBlogs]=useState()
  useEffect(() => {
    const getAllBlog = async () => {
      const res = await fetch('/api/blogs/getAllBlog');
      const blog = await res.json();
      setBlogs(blog);
    };
    getAllBlog();
  }, []); // Empty dependency array means this effect runs only once on mount
  
  useEffect(() => {
    const getAllProduct = async () => {
      const res = await fetch('/api/product/getAllProduct');
      const product = await res.json();
      setProducts(product);
    };
    getAllProduct();
  }, []); // Empty dependency array means this effect runs only once on mount
  
 
  if(!products || !blogs) return ( <div className="">Loading</div> )
  return (
    <div className="">
      <div className="relative ">
      <div className="absolute z-10 text-center inset-0 flex flex-col justify-center items-center text-white px-4">
                  <h1 className="text-5xl sm:text-6xl font-bold mb-4">
                    Welcome to Our Website
                  </h1>
                  <p className="text-2xl sm:text-3xl">
                    Discover amazing blogs and shop our latest products
                  </p>
                </div>
        <Carousel
          autoPlay
          interval={5000}
          stopOnHover={false}
          showArrows={false}
          showStatus={false}
          showThumbs={false}
          infiniteLoop
          transitionTime={500}
        >
          {bannerImages.map((item) => {
            return (
              <div key={item} className="relative">
                <img
                  className="h-[30vh] sm:h-[50vh] md:h-[70vh]"
                  src={item}
                  alt="carousel image"
                />
                
              </div>
            );
          })}
        </Carousel>
      </div>
      <RecommendList item={blogs} type="blog" text="Featured Blogs" />
      <RecommendList item={products} type="product" text="Featured Product" />
    </div>
  );
};

export default Home;
