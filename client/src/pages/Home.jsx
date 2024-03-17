import RecommendList from "../componenets/RecommendList";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
const Home = () => {
  const bannerImages = [
    "https://plus.unsplash.com/premium_photo-1702531819085-4815383bd175?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Z2lybCUyMGxhbmRzY2FwZXxlbnwwfHwwfHx8MA%3D%3D",
    "https://images.unsplash.com/photo-1535638990993-5ad1c21631c4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGdpcmwlMjBsYW5kc2NhcGV8ZW58MHx8MHx8fDA%3D",
    "https://images.unsplash.com/photo-1531291035213-47a9f036412c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGdpcmwlMjBsYW5kc2NhcGV8ZW58MHx8MHx8fDA%3D",
  ];
  return (
    <div className="">
      <div className="relative ">
        <Carousel
          autoPlay
          interval={3000}
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
                <div className="absolute inset-0 flex flex-col justify-center items-start text-black px-4">
                  <h1 className="text-5xl sm:text-6xl font-bold mb-4">
                    Welcome to Our Website
                  </h1>
                  <p className="text-2xl sm:text-3xl">
                    Discover amazing blogs and shop our latest products
                  </p>
                </div>
              </div>
            );
          })}
        </Carousel>
      </div>
      <RecommendList text="Featured Blogs" />
      <RecommendList text="Featured Product" />
    </div>
  );
};

export default Home;
