import React, { useState } from "react";

// Member data (3 members only)
const members = [
  {
    name: "SamPhors",
    email: "samphors@gmail.com",
    avatar: "public/Blush/OIP.webp",
  },
  {
    name: "SivLinh",
    email: "sivlinh@gmail.com",
    avatar: "public/Blush/R.jpg",
  },
  {
    name: "Nova",
    email: "nova@gmail.com",
    avatar: "public/Blush/OIP (1).webp",
  },
];

export default function You() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [user, setUser] = useState(null);

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
    } else {
      alert("❌ User not found! Please check your name and email.");
    }
  };

  // Handle logout
  const handleLogout = () => {
    setIsLoggedIn(false);
    setEmail("");
    setName("");
    setUser(null);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white text-gray-900 px-4">
      {/* Logo */}
      <div className="mb-8">
        <img src="public/image.png" alt="Logo" className="h-10 items-center" />

      </div>

      {/* If user is logged in */}
      {isLoggedIn && user ? (
        <div className="w-full max-w-sm text-center bg-gray-50 border border-gray-200 rounded-xl shadow-md p-6">
          <img
            src={user.avatar}
            alt={user.name}
            className="w-24 h-24 mx-auto rounded-full border-4 border-white shadow-md mb-4"
          />
          <h2 className="text-2xl font-semibold mb-1">{user.name}</h2>
          <p className="text-gray-600 mb-6">{user.email}</p>

          <button
            onClick={handleLogout}
            className="w-full bg-black text-white py-2 rounded-md font-semibold hover:bg-gray-800 transition"
          >
            Log Out
          </button>
        </div>
      ) : (
        // Login form
        <div className="w-full max-w-sm">
          <h1 className="text-2xl font-semibold text-center mb-6">Cloverleaf Account</h1>

          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-1 focus:ring-black"
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-1 focus:ring-black"
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-1 focus:ring-black"
            />

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2">
                <input type="checkbox" />
                Remember Me
              </label>
              <a href="#" className="text-gray-700 hover:underline">
                Forgot your password?
              </a>
            </div>
<button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-md font-semibold hover:bg-blue-400 transition"
            >
              LOGIN
            </button>
          </form>
          <div className="mt-6 text-center space-y-2">
            <a href="#" className="block text-sm text-gray-700 hover:underline">
              Create account
            </a>
            <a href="#" className="block text-sm text-gray-700 hover:underline">
              Manage subscriptions
            </a>
          </div>
        </div>
      )}
    </div>
  );
}