import React from "react";
import Box from "./Components/Box";

const Grid = () => {
  return (
    <div className="px-6 py-10">
      {/* Responsive Grid */}
      <div
        className="
          grid 
          grid-cols-1 
          sm:grid-cols-1 
          md:grid-cols-3 
          gap-6
        "
      >
        <div className="transform hover:-translate-y-1 transition-all duration-300">
          <Box
            title="AI Waste"
            text="Automatically classifies waste (plastic, glass, paper, metal, organic, e-waste) using computer vision and deep learning."
          />
        </div>

        <div className="transform hover:-translate-y-1 transition-all duration-300">
          <Box
            title="Mobile Scanner"
            text="Scan any item with your phone camera to instantly know if it’s recyclable, biodegradable, or hazardous."
          />
        </div>

        <div className="transform hover:-translate-y-1 transition-all duration-300">
          <Box
            title="Smart Bins"
            text="Camera-enabled bins detect waste type in real time and guide users with audio/visual feedback for correct disposal."
          />
        </div>

        <div className="transform hover:-translate-y-1 transition-all duration-300">
          <Box
            title="Gamification & Rewards"
            text="Earn points, badges, and rewards for proper segregation. Compete in leaderboards to promote eco-friendly habits."
          />
        </div>

        <div className="transform hover:-translate-y-1 transition-all duration-300">
          <Box
            title="Municipal Dashboard"
            text="Provides real-time insights to authorities for better waste management, optimized collection routes, and planning."
          />
        </div>

        <div className="transform hover:-translate-y-1 transition-all duration-300">
          <Box
            title="Recycling Awareness Hub"
            text="Learn how to segregate effectively through tutorials, recycling tips, and an AI chatbot answering disposal queries."
          />
        </div>
      </div>
    </div>
  );
};

export default Grid;
