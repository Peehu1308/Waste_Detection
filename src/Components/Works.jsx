import React from "react";
import { FaCamera, FaRobot, FaTrophy, FaChartBar } from "react-icons/fa";

const steps = [
  {
    icon: <FaCamera size={24} className="text-white" />,
    title: "Drop or Scan Waste",
    desc: "Use smart bins or mobile app to input waste items.",
  },
  {
    icon: <FaRobot size={24} className="text-white" />,
    title: "AI Classification",
    desc: "AI detects type of waste in real time.",
  },
  {
    icon: <FaTrophy size={24} className="text-white" />,
    title: "Guidance & Rewards",
    desc: "Users get instructions and earn points for proper disposal.",
  },
  {
    icon: <FaChartBar size={24} className="text-white" />,
    title: "Data to Dashboard",
    desc: "Collected data helps municipalities optimize collection and recycling.",
  },
];

const Works = () => {
  return (
    <section className="py-20 bg-gradient-to-b bg-white text-center">
      {/* Heading */}
      <h2 className="text-4xl font-bold mb-16 text-white tracking-wide">
        How It Works
      </h2>

      {/* Timeline */}
      <div className="relative container mx-auto px-6 max-w-3xl">
        {/* Vertical line */}
        <div className="absolute left-1/2 transform -translate-x-1/2 w-[4px] h-full bg-green-800 opacity-30"></div>

        {steps.map((step, index) => (
          <div
            key={index}
            className={`mb-12 flex flex-col items-center relative`}
          >
            {/* Icon on timeline */}
            <div className="absolute left-1/2 transform -translate-x-1/2 bg-green-600 p-4 rounded-full shadow-xl z-10">
              {step.icon}
            </div>

            {/* Card */}
            <div
              className={`mt-12 bg-green-700 p-6 rounded-xl shadow-md text-center w-full md:w-3/4 ${
                index % 2 === 0 ? "ml-auto" : "mr-auto"
              }`}
            >
              <h3 className="text-xl font-semibold text-white mb-2">
                {step.title}
              </h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                {step.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Works;
