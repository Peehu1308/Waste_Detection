import React from "react";

const badges = [
  { name: "Eco Beginner", points: 50 },
  { name: "Green Hero", points: 150 },
  { name: "Recycling Master", points: 300 },
];

const leaderboard = [
  { name: "Alice", points: 320 },
  { name: "Bob", points: 290 },
  { name: "Charlie", points: 250 },
];

export default function GamificationScreen() {
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

      {/* Main Content */}
      <div className="pt-20 flex flex-col items-center p-8">

        <h2 className="text-3xl font-bold mb-8 text-green-800">Gamification & Rewards</h2>

        {/* User Points */}
        <div className="bg-white shadow-lg rounded-xl p-6 mb-10 w-full max-w-3xl text-center border-l-4 border-green-500">
          <h3 className="text-2xl font-semibold mb-2 text-green-700">Your Points</h3>
          <p className="text-4xl font-bold text-green-800">280</p>
        </div>

        {/* Badges */}
        <div className="w-full max-w-4xl mb-10">
          <h3 className="text-2xl font-semibold mb-4 text-center text-green-700">Badges Earned</h3>
          <div className="flex flex-wrap gap-6 justify-center">
            {badges.map((badge, idx) => (
              <div
                key={idx}
                className="bg-green-100 shadow-md rounded-xl p-4 w-40 text-center hover:shadow-lg transition-shadow duration-200"
              >
                <div className="text-xl font-bold mb-2 text-green-800">{badge.name}</div>
                <div className="text-green-700 font-semibold">{badge.points} pts</div>
              </div>
            ))}
          </div>
        </div>

        {/* Leaderboard */}
        <div className="w-full max-w-4xl">
          <h3 className="text-2xl font-semibold mb-4 text-center text-green-700">Leaderboard</h3>
          <div className="bg-green-100 shadow-md rounded-xl overflow-hidden">
            <table className="w-full text-left">
              <thead className="bg-green-200">
                <tr>
                  <th className="p-4 text-green-800">Rank</th>
                  <th className="p-4 text-green-800">Name</th>
                  <th className="p-4 text-green-800">Points</th>
                </tr>
              </thead>
              <tbody>
                {leaderboard.map((user, idx) => (
                  <tr key={idx} className={idx % 2 === 0 ? "bg-green-50" : ""}>
                    <td className="p-4 text-green-800">{idx + 1}</td>
                    <td className="p-4 text-green-800">{user.name}</td>
                    <td className="p-4 font-bold text-green-900">{user.points}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}
