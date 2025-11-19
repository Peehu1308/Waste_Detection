import React from "react";
import { Users, Leaf, Globe } from "lucide-react";
import Header_App from "./Header";

export default function AboutPage() {
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
        <h1 className="text-4xl md:text-5xl font-bold text-green-800 mb-4">About Swachhta</h1>
        <p className="text-gray-700 text-lg md:text-xl max-w-2xl mx-auto">
          Swachhta empowers communities and individuals to manage waste responsibly while promoting sustainability.
        </p>
      </section>

      {/* Mission & Vision */}
      <section className="py-12 px-6 max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
        <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col items-center">
          <Users size={32} className="text-green-700 mb-4"/>
          <h3 className="text-xl font-semibold mb-2 text-green-800">Community Driven</h3>
          <p className="text-gray-700">We engage communities to collectively reduce waste and recycle efficiently.</p>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col items-center">
          <Leaf size={32} className="text-green-700 mb-4"/>
          <h3 className="text-xl font-semibold mb-2 text-green-800">Eco-Friendly</h3>
          <p className="text-gray-700">Our platform promotes sustainable practices and environmental awareness.</p>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col items-center">
          <Globe size={32} className="text-green-700 mb-4"/>
          <h3 className="text-xl font-semibold mb-2 text-green-800">Global Impact</h3>
          <p className="text-gray-700">We aim to scale our solutions globally, enabling a cleaner and greener world.</p>
        </div>
      </section>
    </div>
  );
}
