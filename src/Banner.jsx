import React from "react";
import { useNavigate } from "react-router-dom";

const Banner = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-gradient-to-b from-green-50 to-white w-full py-20">
      <div className="max-w-5xl mx-auto px-6 flex flex-col items-center text-center">

        {/* Title */}
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-green-800 leading-tight animate-fadeIn">
          AI-Powered Waste Sorting for a Cleaner Future
        </h1>

        {/* Subtitle */}
        <p className="text-green-700 mt-4 text-base sm:text-lg max-w-2xl animate-fadeIn delay-200">
          Revolutionizing waste management using smart deep learning technology to build a cleaner and greener environment.
        </p>

        {/* Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4 animate-fadeIn delay-300">
          <button
            onClick={() => navigate("/upload")}
            className="px-8 py-3 bg-green-600 text-white rounded-lg font-medium shadow-md hover:bg-green-700 hover:shadow-lg transition-all duration-300"
          >
            Get Started
          </button>

          <button
          onClick={() => navigate("/features")}
            className="px-8 py-3 bg-white border border-green-600 text-green-600 rounded-lg font-medium shadow-md hover:bg-green-50 transition-all duration-300"
          >
            Learn More
          </button>
        </div>
      </div>
    </div>
  );
};

export default Banner;
