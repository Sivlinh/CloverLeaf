import React from "react";

export default function Profile() {
  const user = {
    name: "John Doe",
    email: "john@example.com",
    joinDate: "March 2024",
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20 px-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">👤 Profile</h1>

      <div className="max-w-md mx-auto bg-white shadow-md rounded-lg p-6 text-center">
        <img
          src="https://via.placeholder.com/120"
          alt="profile"
          className="w-24 h-24 rounded-full mx-auto mb-4"
        />
        <h2 className="text-xl font-semibold text-gray-800">{user.name}</h2>
        <p className="text-gray-500">{user.email}</p>
        <p className="text-gray-400 text-sm mt-2">Joined {user.joinDate}</p>

        <div className="mt-6 space-y-3">
          <button className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-all">
            Edit Profile
          </button>
          <button className="w-full bg-gray-200 text-gray-800 py-2 rounded-md hover:bg-gray-300 transition-all">
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
}

