import React, { useState, useEffect } from "react";
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
  const [file, setFile] = useState(null);
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [reports, setReports] = useState([]); // store uploaded images info
  const [activePage, setActivePage] = useState("upload"); // upload or report

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
      setShowModal(true);
    } catch (err) {
      console.error(err);
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
      // Save to reports state
      setReports((prev) => [
        ...prev,
        {
          name: file.name,
          detected: result,
          actual: category,
          url: URL.createObjectURL(file)
        }
      ]);
      alert(`Image saved to ${category} folder successfully!`);
      setShowModal(false);
      setFile(null);
      setResult("");
      setSelectedCategory("");
    } catch (err) {
      console.error(err);
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
            <li><button onClick={() => setActivePage("upload")} className="hover:text-black transition">{`Upload`}</button></li>
            <li><button onClick={() => setActivePage("report")} className="hover:text-black transition">{`Reports`}</button></li>
          </ul>

          <button className="md:hidden text-gray-700" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </nav>

        {isOpen && (
          <div className="md:hidden bg-white shadow-md animate-fadein">
            <ul className="flex flex-col items-center space-y-4 py-6 text-gray-700 font-medium">
              <li><button onClick={() => { setActivePage("upload"); setIsOpen(false); }}>Upload</button></li>
              <li><button onClick={() => { setActivePage("report"); setIsOpen(false); }}>Reports</button></li>
            </ul>
          </div>
        )}
      </header>

      <div className="flex flex-col md:flex-row pt-20">

        {/* Sidebar */}
        <aside className="w-full md:w-64 bg-white border-r p-6">
          <h2 className="text-xl font-semibold mb-8">Dashboard</h2>
          <nav className="space-y-4">
            <button onClick={() => setActivePage("upload")} className={`block w-full text-left py-2 px-3 rounded-lg ${activePage === "upload" ? "bg-gray-100" : "hover:bg-gray-100"}`}>Upload Waste</button>
            <button onClick={() => setActivePage("report")} className={`block w-full text-left py-2 px-3 rounded-lg ${activePage === "report" ? "bg-gray-100" : "hover:bg-gray-100"}`}>Reports</button>
            <button className="block w-full text-left py-2 px-3 hover:bg-gray-100 rounded-lg">Settings</button>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 md:p-10">

          {/* Upload Page */}
          {activePage === "upload" && (
            <>
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

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                <div className="bg-white p-6 rounded-xl shadow">
                  <h3 className="text-xl font-semibold">Waste Detection Trends</h3>
                  <ResponsiveContainer width="100%" height={250}>
                    <BarChart data={data}>
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="Plastic" fill="#4ade80" />
                      <Bar dataKey="Organic" fill="#facc15" />
                      <Bar dataKey="Metal" fill="#f87171" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </>
          )}

          {/* Reports Page */}
          {activePage === "report" && (
            <div className="bg-white p-6 rounded-xl shadow">
              <h3 className="text-xl font-semibold mb-4">Previous Uploads</h3>
              {reports.length === 0 && <p>No reports yet.</p>}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {reports.map((report, index) => (
                  <div key={index} className="border rounded p-4 flex flex-col items-center">
                    <img src={report.url} alt={report.name} className="w-40 h-40 object-cover mb-2 rounded"/>
                    <p><strong>Name:</strong> {report.name}</p>
                    <p><strong>Detected:</strong> {report.detected}</p>
                    <p><strong>Actual:</strong> {report.actual}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Modal */}
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

        </main>
      </div>
    </div>
  );
}
