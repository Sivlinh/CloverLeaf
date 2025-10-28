import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState("");
  const [editPhone, setEditPhone] = useState("");
  const [editAvatar, setEditAvatar] = useState(null);

  // ✅ Load user from localStorage when page loads
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  // ✅ Save user to localStorage when it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  // Handle account creation
  const handleCreateAccount = (e) => {
    e.preventDefault();
    const name = e.target.name.value.trim();
    const phone = e.target.phone.value.trim();
    if (!name || !phone) return;

    const newUser = {
      name,
      phone,
      avatar: "https://via.placeholder.com/100",
      joinDate: new Date().toISOString().split("T")[0],
      orders: 0,
    };
    setUser(newUser);
    setEditName(name);
    setEditPhone(phone);
  };

  // Handle image upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setEditAvatar(imageUrl);
      setUser({ ...user, avatar: imageUrl });
    }
  };

  // Save edited info
  const handleSave = () => {
    const updatedUser = {
      ...user,
      name: editName,
      phone: editPhone,
      avatar: editAvatar || user.avatar,
    };
    setUser(updatedUser);
    setIsEditing(false);
  };

  const handleLogout = () => setUser(null);

  return (
    <div className="min-h-screen bg-[#fffaf5]">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white shadow-sm border-b"
      >
        <div className="max-w-4xl mx-auto px-4 py-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-800">My Profile</h1>
          {user && (
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-500 text-white rounded-[25px] hover:bg-red-600 transition"
            >
              Logout
            </button>
          )}
        </div>
      </motion.div>

      <div className="max-w-4xl mx-auto px-4 py-10">
        {!user ? (
          // Create account form
          <motion.form
            onSubmit={handleCreateAccount}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white p-8 rounded-2xl shadow-lg max-w-md mx-auto"
          >
            <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
              Create Your Account
            </h2>
            <div className="mb-4">
              <label className="block mb-2 text-sm font-medium">Full Name</label>
              <input
                type="text"
                name="name"
                placeholder="Enter your name"
                className="w-full border rounded-lg px-4 py-2"
                required
              />
            </div>
            <div className="mb-6">
              <label className="block mb-2 text-sm font-medium">Phone Number</label>
              <input
                type="tel"
                name="phone"
                placeholder="Enter your phone number"
                className="w-full border rounded-lg px-4 py-2"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-green-800 text-white py-2 rounded-2xl hover:bg-green-900 transition"
            >
              Create Account
            </button>
          </motion.form>
        ) : (
          // Profile
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-8 rounded-2xl shadow-lg"
          >
            <div className="text-center mb-6">
              <img
                src={user.avatar}
                alt="avatar"
                className="w-24 h-24 mx-auto rounded-full border-4 border-blue-100 shadow-md mb-4"
              />
              {isEditing && (
                <input type="file" accept="image/*" onChange={handleImageChange} />
              )}
              <h2 className="text-xl font-bold text-gray-800">{user.name}</h2>
              <p className="text-gray-600">{user.phone}</p>
              <p className="text-gray-500 text-sm mt-2">
                Member since {user.joinDate}
              </p>
              <div className="mt-4 space-x-2">
                <button
                  onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
                  className="px-4 py-2 bg-green-800 text-white rounded-[25px] hover:bg-green-900 transition"
                >
                  {isEditing ? "Save" : "Edit Profile"}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
