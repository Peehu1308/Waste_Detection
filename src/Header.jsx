import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import Banner from "./Banner";
import Grid from "./Grid";
import Works from "./Components/Works";

const Header_App = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { label: "Home", href: "#home" },
    { label: "Features", href: "#features" },
    { label: "About", href: "#about" },
    { label: "Impact", href: "#impact" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <div>
      {/* Header */}
      <header className="bg-white w-full shadow-md fixed top-0 left-0 z-50">
        <nav className="container mx-auto flex items-center justify-between px-6 py-3">
          {/* Logo */}
          <a href="/" className="text-2xl font-bold text-gray-900">
            Swachhta
          </a>

          {/* Desktop Menu */}
          <ul className="hidden md:flex space-x-8 text-gray-600 font-medium">
            {navLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="hover:text-black transition-colors duration-200"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-700 focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </nav>

        {/* Mobile Dropdown */}
        {isOpen && (
          <div className="md:hidden bg-white shadow-md animate-fadein">
            <ul className="flex flex-col items-center space-y-4 py-6 text-gray-700 font-medium">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="block text-lg hover:text-black transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </header>

      {/* Page Content */}
      <main className="pt-[70px]">
        <Banner />
        <Grid />
        <Works />
      </main>
    </div>
  );
};

export default Header_App;
