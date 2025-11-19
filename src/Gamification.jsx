import React from "react";

const badges = [
  { name: "Eco Beginner", points: 50 },
  { name: "gray Hero", points: 150 },
  { name: "Recycling Master", points: 300 },
];

const leaderboard = [
  { name: "Alice", points: 320 },
  { name: "Bob", points: 290 },
  { name: "Charlie", points: 250 },
];

export default function GamificationScreen() {
  return (
    <div className="min-h-screen bg-gray-50 p-8 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-8">Gamification & Rewards</h1>

      {/* User Points */}
      <div className="bg-white shadow-md rounded-xl p-6 mb-10 w-full max-w-3xl text-center">
        <h2 className="text-2xl font-semibold mb-2">Your Points</h2>
        <p className="text-4xl font-bold text-gray-600">280</p>
      </div>

      {/* Badges */}
      <div className="w-full max-w-4xl mb-10">
        <h2 className="text-2xl font-semibold mb-4 text-center">Badges Earned</h2>
        <div className="flex flex-wrap gap-6 justify-center">
          {badges.map((badge, idx) => (
            <div key={idx} className="bg-white shadow-lg rounded-xl p-4 w-40 text-center">
              <div className="text-xl font-bold mb-2">{badge.name}</div>
              <div className="text-gray-500 font-semibold">{badge.points} pts</div>
            </div>
          ))}
        </div>
      </div>

      {/* Leaderboard */}
      <div className="w-full max-w-4xl">
        <h2 className="text-2xl font-semibold mb-4 text-center">Leaderboard</h2>
        <div className="bg-white shadow-md rounded-xl overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-4">Rank</th>
                <th className="p-4">Name</th>
                <th className="p-4">Points</th>
              </tr>
            </thead>
            <tbody>
              {leaderboard.map((user, idx) => (
                <tr key={idx} className={idx % 2 === 0 ? "bg-gray-50" : ""}>
                  <td className="p-4">{idx + 1}</td>
                  <td className="p-4">{user.name}</td>
                  <td className="p-4 font-bold text-gray-600">{user.points}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
