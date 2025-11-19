import React, { useState } from "react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer
} from "recharts";
import { Menu, X } from "lucide-react";

const data = [
  { name: "Jan", Plastic: 240, Organic: 100, Metal: 80 },
  { name: "Feb", Plastic: 220, Organic: 140, Metal: 60 },
  { name: "Mar", Plastic: 260, Organic: 120, Metal: 90 },
  { name: "Apr", Plastic: 200, Organic: 180, Metal: 110 },
  { name: "May", Plastic: 280, Organic: 160, Metal: 70 },
  { name: "Jun", Plastic: 300, Organic: 140, Metal: 130 },
  { name: "Jul", Plastic: 310, Organic: 200, Metal: 150 }
];

export default function Dashboard() {
  const [isOpen, setIsOpen] = useState(false);
  const navLinks = [
    { label: "Home", href: "#home" },
    { label: "Features", href: "#features" },
    { label: "About", href: "#about" },
    { label: "Impact", href: "#impact" },
    { label: "Contact", href: "#contact" },
  ];

  const [file, setFile] = useState(null);
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");

  const handleUpload = (e) => {
    setFile(e.target.files[0]);
    setResult("");
    setShowModal(false);
    setSelectedCategory("");
  };

  const handleDetect = async () => {
    if (!file) {
      alert("Please upload an image");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("http://127.0.0.1:8000/predict", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      setResult(data.predicted_class);
      setShowModal(true); // open modal for verification
    } catch (err) {
      console.error("Error uploading image:", err);
      alert("Failed to predict. Please try again.");
    }

    setLoading(false);
  };

  const handleSave = async (category) => {
    if (!file) return;

    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("category", category);

    try {
      await fetch("http://127.0.0.1:8000/save_image", {
        method: "POST",
        body: formData,
      });
      alert(`Image saved to ${category} folder successfully!`);
      setShowModal(false);
      setFile(null);
      setResult("");
    } catch (err) {
      console.error("Error saving image:", err);
      alert("Failed to save image.");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Navbar */}
      <header className="bg-white w-full shadow-md fixed top-0 left-0 z-50">
        <nav className="container mx-auto flex items-center justify-between px-6 py-3">
          <a href="/" className="text-2xl font-bold text-gray-900">Swachhta</a>

          <ul className="hidden md:flex space-x-8 text-gray-600 font-medium">
            {navLinks.map((link) => (
              <li key={link.label}>
                <a href={link.href} className="hover:text-black transition-colors duration-200">{link.label}</a>
              </li>
            ))}
          </ul>

          <button className="md:hidden text-gray-700" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </nav>

        {isOpen && (
          <div className="md:hidden bg-white shadow-md animate-fadein">
            <ul className="flex flex-col items-center space-y-4 py-6 text-gray-700 font-medium">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <a href={link.href} onClick={() => setIsOpen(false)} className="block text-lg hover:text-black transition-colors duration-200">{link.label}</a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </header>

      {/* Main Layout */}
      <div className="flex flex-col md:flex-row pt-20">

        {/* Sidebar */}
        <aside className="w-full md:w-64 bg-white border-r p-6">
          <h2 className="text-xl font-semibold mb-8">Dashboard</h2>
          <nav className="space-y-4">
            <button className="block w-full text-left py-2 px-3 bg-gray-100 rounded-lg">Upload Waste</button>
            <button className="block w-full text-left py-2 px-3 hover:bg-gray-100 rounded-lg">Reports</button>
            <button className="block w-full text-left py-2 px-3 hover:bg-gray-100 rounded-lg">Settings</button>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 md:p-10">

          {/* Upload Card */}
          <div className="bg-white p-6 rounded-xl shadow mb-6">
            <h3 className="text-xl font-semibold">Welcome, Samantha Lee!</h3>
            <p className="text-gray-500 mt-1">Overview of waste detection activities.</p>

            <div className="mt-4">
              <label className="cursor-pointer bg-green-500 text-white px-4 py-2 rounded-lg mr-3 inline-block">
                Upload Waste Image
                <input type="file" className="hidden" onChange={handleUpload} />
              </label>

              <button
                onClick={handleDetect}
                className="bg-black text-white px-4 py-2 rounded-lg mt-2 md:mt-0"
              >
                {loading ? "Detecting..." : "Start Detection"}
              </button>

              {result && !loading && (
                <p className="mt-4 text-lg font-semibold">
                  Detected Category: <span className="text-green-600">{result}</span>
                </p>
              )}
            </div>
          </div>

          {/* Modal for verification */}
          {showModal && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
              <div className="bg-white rounded-lg shadow-lg p-6 w-80 text-center">
                <h3 className="text-xl font-semibold mb-4">Verify Detection</h3>
                <p>Is the detected category <strong>{result}</strong> correct?</p>
                <div className="flex justify-between mt-6">
                  <button
                    className="bg-green-500 text-white px-4 py-2 rounded-lg"
                    onClick={() => handleSave(result)}
                  >
                    ✅ Correct
                  </button>
                  <button
                    className="bg-red-500 text-white px-4 py-2 rounded-lg"
                    onClick={() => setSelectedCategory("Plastic")}
                  >
                    ❌ Wrong
                  </button>
                </div>

                {/* If wrong, select correct category */}
                {selectedCategory && (
                  <div className="mt-4">
                    <p>Select correct category:</p>
                    <select
                      className="border p-2 rounded mt-2 w-full"
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      value={selectedCategory}
                    >
                      <option value="Plastic">Plastic</option>
                      <option value="Organic">Organic</option>
                      <option value="Metal">Metal</option>
                    </select>
                    <button
                      className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-2 w-full"
                      onClick={() => handleSave(selectedCategory)}
                    >
                      Save Image
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Bottom Section → chart */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            <div className="bg-white p-6 rounded-xl shadow">
              <h3 className="text-xl font-semibold">Waste Detection Trends</h3>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={data}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="Plastic" />
                  <Bar dataKey="Organic" />
                  <Bar dataKey="Metal" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

        </main>
      </div>
    </div>
  );
}
