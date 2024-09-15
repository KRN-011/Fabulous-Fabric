import React from "react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <>
    <div className="h-screen relative flex items-center justify-center">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: 'url("../assets/hero-1.jpg")', filter: 'brightness(40%)' }}
      ></div>

      {/* Text Overlay (Without brightness) */}
      <div className="relative z-10 text-center text-white space-y-10 px-4">
        <h1 className="text-4xl lg:text-6xl font-bold mb-4">
          Premium Clothing Materials
        </h1>
        <p className="text-lg lg:text-2xl mx-auto mb-6 w-11/12 md:w-4/5">
          Discover a collection of fabrics designed for comfort and durability, perfect for any fashion design or project. Create with confidence and style.
        </p>
        <Link to={"/product"}><button className="bg-yellow-400 text-zinc-900 px-5 py-3 lg:px-8 lg:py-4 text-base lg:text-xl rounded-lg mt-10 font-semibold shadow hover:bg-yellow-600 transition duration-300">
          Shop Now
        </button>
        </Link>
      </div>
    </div>
    </>
  );
};

export default Hero;
