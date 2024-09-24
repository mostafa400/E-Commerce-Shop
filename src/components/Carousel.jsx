import React, { useState, useEffect } from "react";
import { IoArrowForwardCircle, IoArrowBackCircleSharp } from "react-icons/io5";
import { Link } from "react-router-dom";

const carouselData = [
  {
    image: "Images/wireless-01.png",
    headline: "50% off your first purchase",
    paragraph:
      "All you have to do is simply log in to your account and you'll get 50% off your first shipping for free, no matter where you are!",
    button: "Shop Now",
  },
  {
    image: " Images/watch-06.png",
    headline: "Smart Watches for You",
    paragraph:
      "Stay connected and track your fitness with our latest collection of cutting-edge smartwatches. Enhance your lifestyle today!",
    button: "Shop Now",
  },
  {
    image: "Images/hero-img.png",
    headline: "Experience the Future",
    paragraph:
      "Discover our range of innovative gadgets designed to make your life easier, more efficient, and more enjoyable.",
    button: "Shop Now",
  },
  {
    image: "Images/phone-08.png",
    headline: "Unlock the Power of Mobile",
    paragraph:
      "Explore our selection of state-of-the-art smartphones with advanced features to keep you connected and productive on the go.",
    button: "Shop Now",
  },
];

function Carousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  // slide Movement
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === carouselData.length - 1 ? 0 : prevSlide + 1
    );
  };

  const prevSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === 0 ? carouselData.length - 1 : prevSlide - 1
    );
  };

  const currentData = carouselData[currentSlide];

  return (
    <div className="px-3 lg:px-5 bg-slate-100 relative group ">
      <div className=" container my-0 mx-auto  ">
        <div className=" h-[640px]  md:flex-row flex flex-col items-center  overflow-hidden p-5">
          <div className="w-full lg:p-20  md:w-1/2 md:min-w-[50%] md:text-left text-center  pt-5">
            <h1 className="lg:text-6xl md:text-4xl text-3xl font-bold">
              {currentData.headline}
            </h1>
            <p className="lg-text-2xl md:text-2xl md:p-0 p-3 md:mt-6 mt-3 text-xl">
              {currentData.paragraph}
            </p>
            <Link to="/shop">
              <button className="lg:mt-6 lg:ml-0 md:my-6 my-6 text-indigo-600 text-2xl rounded-lg">
                {currentData.button}
              </button>
            </Link>
          </div>
          <img
            src={currentData.image}
            alt="image"
            className=" md:w-1/2 w-3/4 object-cover"
          ></img>
          <div>
            <IoArrowForwardCircle
              onClick={nextSlide}
              className="hidden group-hover:block text-4xl absolute md:right-8 sm:right-4 right-2 top-1/2 transform -translate-y-1/2 cursor-pointer"
            />
          </div>
          <div>
            <IoArrowBackCircleSharp
              onClick={prevSlide}
              className="hidden group-hover:block text-4xl absolute  md:left-8 sm:left-4 left-2 top-1/2 transform -translate-y-1/2 cursor-pointer"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Carousel;
