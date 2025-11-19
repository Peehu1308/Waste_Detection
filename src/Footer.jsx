import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-200 py-10 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-start gap-8">

        {/* About */}
        <div className="flex-1">
          <h3 className="text-xl font-bold mb-3">Smart Waste Segregation</h3>
          <p className="text-gray-400">
            An AI-powered system that makes waste segregation effortless and promotes eco-friendly habits for a cleaner planet.
          </p>
        </div>

        {/* Quick Links */}
        <div className="flex-1">
          <h4 className="text-lg font-semibold mb-3">Quick Links</h4>
          <ul className="space-y-2 text-gray-400">
            <li><a href="/">Home</a></li>
            <li><a href="/features">Features</a></li>
            <li><a href="/gamification">Gamification</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
        </div>

        {/* Social */}
        <div className="flex-1">
          <h4 className="text-lg font-semibold mb-3">Follow Us</h4>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-white"><FaFacebookF /></a>
            <a href="#" className="hover:text-white"><FaTwitter /></a>
            <a href="#" className="hover:text-white"><FaInstagram /></a>
            <a href="#" className="hover:text-white"><FaLinkedinIn /></a>
          </div>
        </div>

      </div>

      {/* Bottom */}
      <div className="mt-10 text-center text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} Smart Waste Segregation. All rights reserved.
      </div>
    </footer>
  );
}
