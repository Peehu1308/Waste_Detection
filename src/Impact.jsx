import React from "react";
import { Leaf, BarChart2, Users } from "lucide-react";
import Header_App from "./Header";

export default function ImpactPage() {
  const impacts = [
    {
      icon: <Leaf size={32} className="text-green-700" />,
      title: "Waste Collected",
      value: "12,500 kg",
      description: "Total amount of waste properly collected and classified by users.",
    },
    {
      icon: <BarChart2 size={32} className="text-green-700" />,
      title: "Recycling Rate",
      value: "78%",
      description: "Percentage of waste successfully recycled through app recommendations.",
    },
    {
      icon: <Users size={32} className="text-green-700" />,
      title: "Active Users",
      value: "4,200",
      description: "Number of users actively participating in sustainable waste management.",
    },
    {
      icon: <Leaf size={32} className="text-green-700" />,
      title: "Eco-Friendly Projects",
      value: "15",
      description: "Number of community initiatives supported through Swachhta.",
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

      {/* Hero Section */}
      <section className="pt-24 text-center px-6">
        <h1 className="text-4xl md:text-5xl font-bold text-green-800 mb-4">Our Impact</h1>
        <p className="text-gray-700 text-lg md:text-xl max-w-2xl mx-auto">
          See how Swachhta is making a difference for communities and the environment.
        </p>
      </section>

      {/* Impact Cards */}
      <section className="py-12 px-6 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {impacts.map((impact, idx) => (
          <div
            key={idx}
            className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col items-center text-center"
          >
            {impact.icon}
            <h3 className="text-xl font-semibold mt-4 mb-2 text-green-800">{impact.title}</h3>
            <p className="text-3xl font-bold text-green-900 mb-2">{impact.value}</p>
            <p className="text-gray-700">{impact.description}</p>
          </div>
        ))}
      </section>

      {/* Call-to-Action */}
      <section className="py-12 px-6 text-center">
        <h2 className="text-3xl font-bold text-green-800 mb-4">Join Us & Make a Difference</h2>
        <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
          Become part of the Swachhta community and help us create a cleaner, greener world. Every small action counts!
        </p>
        <a
          href="/home"
          className="bg-green-600 hover:bg-green-700 text-white font-bold px-6 py-3 rounded-full shadow-lg transition-colors duration-300"
        >
          Get Started
        </a>
      </section>

    </div>
  );
}
