import React, { useState } from "react";
import { motion } from "framer-motion";

// Member data (3 members only)
const members = [
  {
    name: "SamPhors",
    email: "samphors@gmail.com",
    avatar: "public/Blush/OIP.webp",
    joinDate: "2025-01-15",
    orders: 12,
  },
  {
    name: "SivLinh",
    email: "sivlinh@gmail.com",
    avatar: "public/Blush/R.jpg",
    joinDate: "2025-03-22",
    orders: 8,
  },
  {
    name: "Nova",
    email: "nova@gmail.com",
    avatar: "public/Blush/OIP (1).webp",
    joinDate: "2025-05-10",
    orders: 15,
  },
];

export default function Profile() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState("");
  const [editEmail, setEditEmail] = useState("");

  // Handle login
  const handleLogin = (e) => {
    e.preventDefault();

    // find user in member list
    const foundUser = members.find(
      (m) =>
        m.email.toLowerCase() === email.toLowerCase() &&
        m.name.toLowerCase() === name.toLowerCase()
    );

    if (foundUser) {
      setUser(foundUser);
      setIsLoggedIn(true);
      setEditName(foundUser.name);
      setEditEmail(foundUser.email);
    } else {
      // alert("❌ User not found! Please check your name and email.");
    }
  };

  // Handle logout
  const handleLogout = () => {
    setIsLoggedIn(false);
    setEmail("");
    setName("");
    setUser(null);
    setIsEditing(false);
  };

  // Handle edit profile
  const handleEditProfile = () => {
    if (isEditing) {
      // Save changes
      setUser({ ...user, name: editName, email: editEmail });
    }
    setIsEditing(!isEditing);
  };

  return (
    <div className="min-h-screen bg-[#fffaf5]">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white shadow-sm border-b"
      >
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <img src="public/image.png" alt="Logo" className="h-10" />
              <h1 className="text-2xl font-bold text-gray-800">My Profile</h1>
            </div>
            {isLoggedIn && (
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      </motion.div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {!isLoggedIn ? (
          // Login Form - Simple and Clean
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-md mx-auto bg-white rounded-2xl shadow-xl p-8"
          >
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">Welcome Back</h2>
              <p className="text-gray-600">Sign in to your Cloverleaf account</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                <input
                  type="text"
                  placeholder="Enter your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                <input
                  type="password"
                  placeholder="Enter your password"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  required
                />
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                  <span className="ml-2 text-sm text-gray-600">Remember me</span>
                </label>
                <a href="#" className="text-sm text-blue-600 hover:text-blue-700">
                  Forgot password?
                </a>
              </div>

              <button
                type="submit"
                className="w-full bg-green-900 text-white py-3 rounded-lg font-semibold hover:bg-green-800 transition-colors"
              >
                Sign In
              </button>
            </form>

            <div className="mt-8 text-center">
              <p className="text-gray-600">
                Don't have an account?{" "}
                <a href="#" className="text-blue-600 hover:text-blue-700 font-medium">
                  Create one
                </a>
              </p>
            </div>
          </motion.div>
        ) : (
          // Profile Display - Simple and Clean
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-xl p-8"
          >
            {/* Profile Header */}
            <div className="text-center mb-8">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-24 h-24 mx-auto rounded-full border-4 border-blue-100 shadow-md mb-4"
              />
              <h2 className="text-2xl font-bold text-gray-800 mb-2">{user.name}</h2>
              <p className="text-gray-600">{user.email}</p>
              <button
                onClick={handleEditProfile}
                className="mt-4 px-6 py-2 bg-green-900 text-white rounded-lg hover:bg-green-800 transition-colors"
              >
                {isEditing ? "Save Changes" : "Edit Profile"}
              </button>
            </div>

            {/* Profile Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  ) : (
                    <p className="text-gray-800 py-3 px-4 bg-gray-50 rounded-lg">{user.name}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  {isEditing ? (
                    <input
                      type="email"
                      value={editEmail}
                      onChange={(e) => setEditEmail(e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  ) : (
                    <p className="text-gray-800 py-3 px-4 bg-gray-50 rounded-lg">{user.email}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Member Since
                  </label>
                  <p className="text-gray-800 py-3 px-4 bg-gray-50 rounded-lg">{user.joinDate}</p>
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-blue-50 rounded-lg p-6">
                  <h3 className="font-semibold text-gray-800 mb-2">Total Orders</h3>
                  <p className="text-3xl font-bold text-blue-600">{user.orders}</p>
                </div>

                <div className="bg-blue-50 rounded-lg p-6">
                  <h3 className="font-semibold text-gray-800 mb-2">Loyalty Points</h3>
                  <p className="text-3xl font-bold text-blue-600">{user.orders * 10}</p>
                </div>

                <div className="text-center">
                  <a
                    href="/shop"
                    className="inline-block px-6 py-3 bg-green-900 text-white rounded-lg hover:bg-green-800 transition-colors"
                  >
                    Continue Shopping
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}