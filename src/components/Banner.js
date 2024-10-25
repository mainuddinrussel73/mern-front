// src/components/BannerSlider.js
import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';

const banners = [
  {
    title: "Welcome to Our Shop",
    description: "Discover a wide range of products including books, courses, and more!",
    imageUrl: "https://media.istockphoto.com/id/1133980246/photo/shopping-online-concept-shopping-service-on-the-online-web-with-payment-by-credit-card-and.jpg?s=612x612&w=0&k=20&c=joeQ74hTCWThhW6XfnBsCUc5Qp3YB868J-hyBWxGSUM=",
    buttonLabel: "Explore Products",
    link: "/products",
  },
  {
    title: "Exclusive Deals on Electronics",
    description: "Find amazing deals on the latest computers, mobiles, and more!",
    imageUrl: "https://media.istockphoto.com/id/1249219777/photo/shopping-online-concept-parcel-or-paper-cartons-with-a-shopping-cart-logo-in-a-trolley-on-a.jpg?s=612x612&w=0&k=20&c=EWKEahyVLY8iAHyirCCDESHRGW37lqUJ7In0SssNSLE=",
    buttonLabel: "Shop Electronics",
    link: "/products",
  },
  {
    title: "Recycle Your Products",
    description: "Help save the environment by recycling your old products with us!",
    imageUrl: "https://media.istockphoto.com/id/1362936402/photo/young-freelance-asian-woman-using-laptop-packing-cardboard-box-in-living-room-at-home-at.jpg?s=612x612&w=0&k=20&c=qrrsOUh0UiaUGmRUXE-DTmd8wlJMqU3CnB6UPpBU5ZQ=",
    buttonLabel: "Recycle Now",
    link: "/products",
  },
];

const Banner = () => {
  const [currentBanner, setCurrentBanner] = useState(0);

  // Auto slide every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBanner((prevBanner) => (prevBanner + 1) % banners.length);
    }, 3000);

    return () => clearInterval(interval); // Cleanup the interval on component unmount
  }, []);

  return (
    <div className="relative bg-gray-900 text-white">
      {/* Background Image */}
      <img
        src={banners[currentBanner].imageUrl}
        alt="Banner"
        className="absolute inset-0 object-cover w-full h-full opacity-50 transition-opacity duration-1000"
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-screen text-center">
        <h1 className="text-4xl font-bold sm:text-6xl">{banners[currentBanner].title}</h1>
        <p className="mt-4 text-xl sm:text-2xl max-w-xl">{banners[currentBanner].description}</p>

        <Link
          to={banners[currentBanner].link}
          className="mt-6 px-6 py-3 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 transition duration-300"
        >
          {banners[currentBanner].buttonLabel}
        </Link>
      </div>

      {/* Indicator Dots */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {banners.map((_, index) => (
          <span
            key={index}
            className={`h-3 w-3 rounded-full ${index === currentBanner ? 'bg-indigo-600' : 'bg-gray-400'}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Banner;
