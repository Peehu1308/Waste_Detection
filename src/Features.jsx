import React from "react";
import { CheckCircle } from "lucide-react";
import Header_App from "./Header";

export default function FeaturesPage() {
  const features = [
    {
      title: "Smart Waste Detection",
      description: "Automatically detect and classify different types of waste using AI models.",
    },
    {
      title: "Gamification & Rewards",
      description: "Earn points and badges for contributing to waste management.",
    },
    {
      title: "Leaderboards",
      description: "Compete with other users and track your performance over time.",
    },
    {
      title: "Reports & Analytics",
      description: "Visualize your waste detection trends and monitor improvements.",
    },
    {
      title: "Disposal Recommendations",
      description: "Get actionable suggestions for proper disposal of different waste types.",
    },
  ];

  return (
    <div className="min-h-screen bg-green-50">

      {/* Navbar (same as Dashboard) */}
      <header className="bg-white w-full shadow-md fixed top-0 left-0 z-50">
        <nav className="container mx-auto flex items-center justify-between px-6 py-3">
          <a href="/" className="text-2xl font-bold text-gray-900">Swachhta</a>

          <ul className="hidden md:flex space-x-8 text-gray-600 font-medium">
            <li><a href="/home" className="hover:text-black transition">Home</a></li>
            <li><a href="/features" className="hover:text-black transition">Features</a></li>
            <li><a href="/gamification" className="hover:text-black transition">Gamification</a></li>
            <li><a href="/about" className="hover:text-black transition">About</a></li>
            <li><a href="/impact" className="hover:text-black transition">Impact</a></li>
            
          </ul>

          <button className="md:hidden text-gray-700">
            {/* You can add mobile menu toggle if needed */}
          </button>
        </nav>
      </header>
      <section className="pt-24 text-center px-6">
        <h1 className="text-4xl md:text-5xl font-bold text-green-800 mb-4">Powerful Features</h1>
        <p className="text-gray-700 text-lg md:text-xl max-w-2xl mx-auto">
          Explore the tools and capabilities of Swachhta that help you manage waste efficiently and sustainably.
        </p>
      </section>

      {/* Features Grid */}
      <section className="py-12 px-6 w-full max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((feature, idx) => (
          <div
            key={idx}
            className="bg-gradient-to-br from-green-100 to-green-200 p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col items-start"
          >
            <CheckCircle size={32} className="text-green-700 mb-4"/>
            <h3 className="text-2xl font-semibold mb-2 text-green-800">{feature.title}</h3>
            <p className="text-gray-700">{feature.description}</p>
          </div>
        ))}
      </section>
    </div>
  );
}
