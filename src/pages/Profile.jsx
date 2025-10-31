import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaShoppingBag, FaStar, FaCog, FaHistory, FaCreditCard, FaMapMarkerAlt, FaUser, FaWallet } from "react-icons/fa";
import products from "../data/products";

export default function Profile() {
   const [user, setUser] = useState(null);
   const [isEditing, setIsEditing] = useState(false);
   const [editName, setEditName] = useState("");
   const [editPhone, setEditPhone] = useState("");
   const [editPhoneNumber, setEditPhoneNumber] = useState("");
   const [editAvatar, setEditAvatar] = useState(null);
   const [editAddress, setEditAddress] = useState("");
   const [showTopUp, setShowTopUp] = useState(false);
   const [topUpAmount, setTopUpAmount] = useState("");
   const [showQR, setShowQR] = useState(false);
   const [showSuccess, setShowSuccess] = useState(false);
   const [qrData, setQrData] = useState(null);
   const [paymentTimer, setPaymentTimer] = useState(null);
   const [timeLeft, setTimeLeft] = useState(300); // 5 minutes
   const [isCheckingPayment, setIsCheckingPayment] = useState(false);
   const [activeTab, setActiveTab] = useState("profile");
   const [favorites, setFavorites] = useState([]);
   const [orderHistory, setOrderHistory] = useState([]);
   const [isLoginMode, setIsLoginMode] = useState(false);
   const [loginEmail, setLoginEmail] = useState("");
   const [loginPassword, setLoginPassword] = useState("");
   const [signupPassword, setSignupPassword] = useState("");
   const [confirmPassword, setConfirmPassword] = useState("");

  // ✅ Load user data
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      const parsedUser = JSON.parse(savedUser);
      setUser(parsedUser);

      // Load user-specific order history
      const userOrdersKey = `orders_${parsedUser.id}`;
      const savedOrders = localStorage.getItem(userOrdersKey);
      if (savedOrders) setOrderHistory(JSON.parse(savedOrders));
    }

    const savedFavorites = localStorage.getItem("favorites");
    if (savedFavorites) setFavorites(JSON.parse(savedFavorites));
  }, []);

  // Keep data in sync with other components
  useEffect(() => {
    const handleFavoritesUpdate = () => {
      const savedFavorites = localStorage.getItem("favorites");
      if (savedFavorites) setFavorites(JSON.parse(savedFavorites));
    };

    const handleOrderHistoryUpdate = () => {
      if (user) {
        const userOrdersKey = `orders_${user.id}`;
        const savedOrders = localStorage.getItem(userOrdersKey);
        if (savedOrders) setOrderHistory(JSON.parse(savedOrders));
      }
    };

    const handleWalletUpdate = () => {
      const savedUser = localStorage.getItem("user");
      if (savedUser) {
        const parsedUser = JSON.parse(savedUser);
        setUser(parsedUser);
      }
    };

    window.addEventListener("favoritesUpdated", handleFavoritesUpdate);
    window.addEventListener("orderHistoryUpdated", handleOrderHistoryUpdate);
    window.addEventListener("walletUpdated", handleWalletUpdate);

    return () => {
      window.removeEventListener("favoritesUpdated", handleFavoritesUpdate);
      window.removeEventListener("orderHistoryUpdated", handleOrderHistoryUpdate);
      window.removeEventListener("walletUpdated", handleWalletUpdate);
    };
  }, [user]);

  // ✅ Save user data
  useEffect(() => {
    if (user) localStorage.setItem("user", JSON.stringify(user));
    else localStorage.removeItem("user");
  }, [user]);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    if (user) {
      const userOrdersKey = `orders_${user.id}`;
      localStorage.setItem(userOrdersKey, JSON.stringify(orderHistory));
    }
  }, [orderHistory, user]);

  // ✅ Create account
  const handleCreateAccount = (e) => {
    e.preventDefault();
    const name = e.target.name.value.trim();
    const email = e.target.email.value.trim();
    const password = e.target.password.value.trim();
    const confirmPass = e.target.confirmPassword.value.trim();

    if (!name || !email || !password) return;

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address");
      return;
    }

    // Password validation
    if (password.length < 6) {
      alert("Password must be at least 6 characters long");
      return;
    }

    if (password !== confirmPass) {
      alert("Passwords do not match");
      return;
    }

    // Check if user already exists
    const existingUsers = JSON.parse(localStorage.getItem("users") || "[]");
    if (existingUsers.find(u => u.email === email)) {
      alert("An account with this email already exists");
      return;
    }

    const newUser = {
      id: Date.now(),
      name,
      email,
      phoneNumber: "",
      password, // In real app, this should be hashed
      avatar: "https://via.placeholder.com/100",
      joinDate: new Date().toISOString().split("T")[0],
      address: "",
      wallet: 0,
    };

    // Save to users array
    existingUsers.push(newUser);
    localStorage.setItem("users", JSON.stringify(existingUsers));

    // Set current user
    setUser(newUser);
    setEditName(name);
    setEditPhone(email);
    setEditPhoneNumber("");
    setSignupPassword("");
    setConfirmPassword("");
  };

  // ✅ Login
  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value.trim();
    const password = e.target.password.value.trim();

    if (!email || !password) return;

    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const foundUser = users.find(u => u.email === email && u.password === password);

    if (foundUser) {
      setUser(foundUser);
      setLoginEmail("");
      setLoginPassword("");
    } else {
      alert("Invalid email or password");
    }
  };

  // ✅ Upload image
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setEditAvatar(imageUrl);
      setUser({ ...user, avatar: imageUrl });
    }
  };

  // ✅ Save edited info
  const handleSave = () => {
    // Validate email if editing
    if (editPhone) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(editPhone)) {
        alert("Please enter a valid email address");
        return;
      }
    }

    const updatedUser = {
      ...user,
      name: editName,
      email: editPhone,
      phoneNumber: editPhoneNumber,
      avatar: editAvatar || user.avatar,
      address: editAddress,
    };

    // Update in users array
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const userIndex = users.findIndex(u => u.id === user.id);
    if (userIndex !== -1) {
      users[userIndex] = updatedUser;
      localStorage.setItem("users", JSON.stringify(users));
    }

    setUser(updatedUser);
    setIsEditing(false);
  };

  const handleLogout = () => {
    setUser(null);
    setIsLoginMode(false);
    setLoginEmail("");
    setLoginPassword("");
    setSignupPassword("");
    setConfirmPassword("");
  };

  // ✅ Toggle favorite
  const toggleFavorite = (productId) => {
    setFavorites(prev =>
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  // ✅ Add to order history (simulate purchase)
  const addToOrderHistory = (product) => {
    const order = {
      id: Date.now(),
      productId: product.id,
      productName: product.title,
      price: product.price,
      date: new Date().toISOString(),
      status: "Delivered"
    };
    setOrderHistory(prev => [order, ...prev]);
    window.dispatchEvent(new Event("orderHistoryUpdated"));
  };

  // ✅ Calculate statistics
  const getStats = () => {
    const totalOrders = orderHistory.length;
    const totalSpent = orderHistory.reduce((sum, order) => sum + order.price, 0);
    const avgRating = favorites.length > 0
      ? products.filter(p => favorites.includes(p.id)).reduce((sum, p) => sum + p.rating, 0) / favorites.length
      : 0;
    return { totalOrders, totalSpent, avgRating };
  };

  // ✅ Handle ABA top-up
   const handleTopUp = async () => {
     const amount = parseFloat(topUpAmount);
     if (isNaN(amount) || amount <= 0) {
       alert('Please enter a valid amount');
       return;
     }

     if (amount < 0.001) {
       alert('Minimum top-up amount is $0.001');
       return;
     }

     // For demo purposes, simulate successful payment without backend
     setQrData({
       amount: amount,
       qr_image: 'https://via.placeholder.com/200x200?text=QR+Code', // Placeholder QR
       md5: 'demo-' + Date.now()
     });
     setShowQR(true);
     setTimeLeft(300); // 5 minutes
     startPaymentTimer('demo-' + Date.now());
   };

  // ✅ Start payment timer and checking
   const startPaymentTimer = (md5) => {
     const timer = setInterval(() => {
       setTimeLeft(prev => {
         if (prev <= 1) {
           clearInterval(timer);
           setPaymentTimer(null);
           setShowQR(false);
           setQrData(null);
           alert('Payment timeout. Please try again.');
           return 0;
         }
         return prev - 1;
       });
     }, 1000);

     setPaymentTimer(timer);

     // For demo purposes, simulate payment success after 5 seconds
     setTimeout(() => {
       clearInterval(timer);
       setPaymentTimer(null);
       setShowSuccess(true);
       setTimeout(() => {
         const updatedUser = { ...user, wallet: (user.wallet || 0) + parseFloat(topUpAmount) };

         // Update user in users array
         const users = JSON.parse(localStorage.getItem("users") || "[]");
         const userIndex = users.findIndex(u => u.id === user.id);
         if (userIndex !== -1) {
           users[userIndex] = updatedUser;
           localStorage.setItem("users", JSON.stringify(users));
         }

         setUser(updatedUser);
         setShowSuccess(false);
         setTopUpAmount("");
         setShowQR(false);
         setQrData(null);
         setShowTopUp(false);
       }, 2000);
     }, 5000); // Simulate payment success after 5 seconds
   };

  // ✅ Cancel payment
  const handleCancelPayment = () => {
    if (paymentTimer) {
      clearInterval(paymentTimer);
      setPaymentTimer(null);
    }
    setShowQR(false);
    setQrData(null);
    setTimeLeft(300);
  };

  const stats = user ? getStats() : { totalOrders: 0, totalSpent: 0, avgRating: 0 };

  return (
    <div className="min-h-screen bg-[#fffaf5]">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white shadow-sm border-b"
      >
        <div className="max-w-6xl mx-auto px-4 py-6 flex items-center justify-between">
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

      {/* Main content */}
      <div className="max-w-6xl mx-auto px-4 py-10">
        {!user ? (
           // Login/Signup forms
           <motion.div
             initial={{ opacity: 0, scale: 0.95 }}
             animate={{ opacity: 1, scale: 1 }}
             className="bg-white p-8 rounded-2xl shadow-lg max-w-md mx-auto"
           >
             <div className="flex justify-center mb-6">
               <button
                 onClick={() => setIsLoginMode(false)}
                 className={`px-4 py-2 rounded-l-lg font-medium transition ${!isLoginMode ? 'bg-green-800 text-white' : 'bg-gray-200 text-gray-700'}`}
               >
                 Sign Up
               </button>
               <button
                 onClick={() => setIsLoginMode(true)}
                 className={`px-4 py-2 rounded-r-lg font-medium transition ${isLoginMode ? 'bg-green-800 text-white' : 'bg-gray-200 text-gray-700'}`}
               >
                 Login
               </button>
             </div>

             {!isLoginMode ? (
               // Sign Up Form
               <motion.form
                 onSubmit={handleCreateAccount}
                 initial={{ opacity: 0 }}
                 animate={{ opacity: 1 }}
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
                     className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                     required
                   />
                 </div>
                 <div className="mb-4">
                   <label className="block mb-2 text-sm font-medium">Email Address</label>
                   <input
                     type="email"
                     name="email"
                     placeholder="Enter your email address"
                     className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                     required
                   />
                 </div>
                 <div className="mb-4">
                   <label className="block mb-2 text-sm font-medium">Password</label>
                   <input
                     type="password"
                     name="password"
                     value={signupPassword}
                     onChange={(e) => setSignupPassword(e.target.value)}
                     placeholder="Enter your password"
                     className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                     required
                   />
                 </div>
                 <div className="mb-6">
                   <label className="block mb-2 text-sm font-medium">Confirm Password</label>
                   <input
                     type="password"
                     name="confirmPassword"
                     value={confirmPassword}
                     onChange={(e) => setConfirmPassword(e.target.value)}
                     placeholder="Confirm your password"
                     className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                     required
                   />
                 </div>
                 <button
                   type="submit"
                   className="w-full bg-green-800 text-white py-3 rounded-2xl hover:bg-green-900 transition font-medium shadow-lg hover:shadow-xl"
                 >
                   Create Account
                 </button>
               </motion.form>
             ) : (
               // Login Form
               <motion.form
                 onSubmit={handleLogin}
                 initial={{ opacity: 0 }}
                 animate={{ opacity: 1 }}
               >
                 <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
                   Welcome Back
                 </h2>
                 <div className="mb-4">
                   <label className="block mb-2 text-sm font-medium">Email Address</label>
                   <input
                     type="email"
                     name="email"
                     value={loginEmail}
                     onChange={(e) => setLoginEmail(e.target.value)}
                     placeholder="Enter your email address"
                     className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                     required
                   />
                 </div>
                 <div className="mb-6">
                   <label className="block mb-2 text-sm font-medium">Password</label>
                   <input
                     type="password"
                     name="password"
                     value={loginPassword}
                     onChange={(e) => setLoginPassword(e.target.value)}
                     placeholder="Enter your password"
                     className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                     required
                   />
                 </div>
                 <button
                   type="submit"
                   className="w-full bg-green-800 text-white py-3 rounded-2xl hover:bg-green-900 transition font-medium shadow-lg hover:shadow-xl"
                 >
                   Login
                 </button>
               </motion.form>
             )}
           </motion.div>
        ) : (
          // User profile with tabs
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-lg overflow-hidden"
          >
            {/* Profile Header */}
            <div className="bg-gradient-to-r from-gray-300 to-gray-500 text-white p-8">
              <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                <div className="relative">
                  <img
                    src={user.avatar}
                    alt="avatar"
                    className="w-24 h-24 rounded-full border-4 border-white shadow-lg"
                  />
                  {isEditing && (
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                  )}
                </div>
                <div className="text-center md:text-left flex-1">
                  <h2 className="text-2xl font-bold">{user.name}</h2>
                  <p className="text-white-100">{user.email}</p>
                  <p className="text-wthie-200 text-sm mt-1">
                    Member since {user.joinDate}
                  </p>
                  <div className="flex flex-wrap gap-4 mt-4 justify-center md:justify-start">
                    <div className="bg-white/20 rounded-lg px-3 py-1">
                      <FaShoppingBag className="inline mr-1" />
                      {stats.totalOrders} Orders
                    </div>
                    <div className="bg-white/20 rounded-lg px-3 py-1">
                      <FaWallet className="inline mr-1" />
                      ${stats.totalSpent.toFixed(2)} Spent
                    </div>
                   
                  </div>
                </div>
              </div>
            </div>

            {/* Tab Navigation */}
            <div className="border-b bg-gray-50">
              <div className="flex overflow-x-auto">
                {[
                  { id: "profile", label: "Profile", icon: FaUser },
                  { id: "orders", label: "Orders", icon: FaHistory },
                  { id: "wallet", label: "Wallet", icon: FaCreditCard },
                  { id: "settings", label: "Settings", icon: FaCog },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-6 py-4 font-medium transition-colors whitespace-nowrap ${
                      activeTab === tab.id
                        ? "text-green-600 border-b-2 border-green-600 bg-white"
                        : "text-gray-600 hover:text-green-600 hover:bg-gray-100"
                    }`}
                  >
                    <tab.icon />
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Tab Content */}
            <div className="p-8">
              {activeTab === "profile" && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                        <FaUser /> Personal Information
                      </h3>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                          {isEditing ? (
                            <input
                              type="text"
                              value={editName}
                              onChange={(e) => setEditName(e.target.value)}
                              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                            />
                          ) : (
                            <p className="text-gray-600 bg-gray-50 px-3 py-2 rounded-lg">{user.name}</p>
                          )}
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                          {isEditing ? (
                            <input
                              type="email"
                              value={editPhone}
                              onChange={(e) => setEditPhone(e.target.value)}
                              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                            />
                          ) : (
                            <p className="text-gray-600 bg-gray-50 px-3 py-2 rounded-lg">{user.email}</p>
                          )}
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                          {isEditing ? (
                            <input
                              type="tel"
                              value={editPhoneNumber}
                              onChange={(e) => setEditPhoneNumber(e.target.value)}
                              placeholder="Enter your phone number"
                              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                            />
                          ) : (
                            <p className="text-gray-600 bg-gray-50 px-3 py-2 rounded-lg">{user.phoneNumber || "No phone number added yet."}</p>
                          )}
                        </div>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                        <FaMapMarkerAlt /> Delivery Address
                      </h3>
                      {isEditing ? (
                        <textarea
                          value={editAddress}
                          onChange={(e) => setEditAddress(e.target.value)}
                          placeholder="Enter your delivery address"
                          rows={4}
                          className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        />
                      ) : (
                        <p className="text-gray-600 bg-gray-50 px-3 py-2 rounded-lg min-h-[100px]">
                          {user.address || "No address added yet."}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="mt-8 flex justify-center">
                    <button
                      onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                      className="px-8 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition font-medium shadow-lg hover:shadow-xl"
                    >
                      {isEditing ? "Save Changes" : "Edit Profile"}
                    </button>
                  </div>
                </motion.div>
              )}

              {activeTab === "orders" && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
                    <FaHistory /> Order History
                  </h3>
                  {orderHistory.length > 0 ? (
                    <div className="space-y-4">
                      {orderHistory.map((order) => {
                        const product = products.find(p => p.id === order.productId);
                        return (
                          <div key={order.id} className="border rounded-lg p-4 hover:shadow-md transition">
                            <div className="flex justify-between items-start">
                              <div className="flex items-center gap-4">
                                {product && product.images && product.images[0] && (
                                  <img
                                    src={product.images[0]}
                                    alt={order.productName}
                                    className="w-16 h-16 object-cover rounded"
                                  />
                                )}
                                <div>
                                  <h4 className="font-medium text-gray-800">{order.productName}</h4>
                                  <p className="text-sm text-gray-600">
                                    Order #{order.id} • {new Date(order.date).toLocaleDateString()}
                                  </p>
                                </div>
                              </div>
                              <div className="text-right">
                                <p className="font-semibold text-green-600">${order.price}</p>
                                <span className={`text-xs px-2 py-1 rounded-full ${
                                  order.status === 'Processing' ? 'bg-yellow-100 text-yellow-800' :
                                  order.status === 'Shipped' ? 'bg-blue-100 text-blue-800' :
                                  'bg-green-100 text-green-800'
                                }`}>
                                  {order.status}
                                </span>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <FaShoppingBag className="mx-auto text-4xl text-gray-300 mb-4" />
                      <p className="text-gray-500">No orders yet</p>
                      <p className="text-sm text-gray-400">Your order history will appear here</p>
                    </div>
                  )}
                </motion.div>
              )}


              {activeTab === "wallet" && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <div className="text-center">
                    <div className="bg-gradient-to-r from-green-100 to-blue-100 text-gray-700 p-8 rounded-2xl mb-6">
                      <FaWallet className="mx-auto text-4xl mb-4 text-green-600" />
                      <h3 className="text-2xl font-bold mb-2">Wallet Balance</h3>
                      <p className="text-4xl font-bold text-green-600">${user.wallet ? user.wallet.toFixed(2) : '0.00'}</p>
                    </div>
                    <button
                      onClick={() => setShowTopUp(true)}
                      className="px-8 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition font-medium shadow-lg hover:shadow-xl"
                    >
                      <FaCreditCard className="inline mr-2" />
                      Top Up via ABA
                    </button>
                  </div>
                </motion.div>
              )}

              {activeTab === "settings" && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
                    <FaCog /> Account Settings
                  </h3>
                  <div className="space-y-6">
                    <div className="border rounded-lg p-4">
                      <h4 className="font-medium text-gray-800 mb-2">Notifications</h4>
                      <div className="space-y-2">
                        <label className="flex items-center">
                          <input type="checkbox" className="mr-2" defaultChecked />
                          <span className="text-sm">Order updates</span>
                        </label>
                        <label className="flex items-center">
                          <input type="checkbox" className="mr-2" defaultChecked />
                          <span className="text-sm">Promotional emails</span>
                        </label>
                        <label className="flex items-center">
                          <input type="checkbox" className="mr-2" />
                          <span className="text-sm">New product alerts</span>
                        </label>
                      </div>
                    </div>
                    <div className="border rounded-lg p-4">
                      <h4 className="font-medium text-gray-800 mb-2">Privacy</h4>
                      <div className="space-y-2">
                        <label className="flex items-center">
                          <input type="checkbox" className="mr-2" />
                          <span className="text-sm">Make profile public</span>
                        </label>
                        <label className="flex items-center">
                          <input type="checkbox" className="mr-2" defaultChecked />
                          <span className="text-sm">Show purchase history</span>
                        </label>
                      </div>
                    </div>
                    <div className="border rounded-lg p-4">
                      <h4 className="font-medium text-gray-800 mb-2">Security</h4>
                      <div className="space-y-3">
                        <button className="w-full text-left px-3 py-2 bg-gray-50 rounded hover:bg-gray-100 transition">
                          Change Password
                        </button>
                        <button className="w-full text-left px-3 py-2 bg-gray-50 rounded hover:bg-gray-100 transition">
                          Enable Two-Factor Authentication
                        </button>
                      </div>
                    </div>
                    <div className="pt-4 border-t">
                      <h4 className="font-medium text-gray-800 mb-3">Danger Zone</h4>
                      <button className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition shadow-sm">
                        Delete Account
                      </button>
                      <p className="text-xs text-gray-500 mt-2">
                        This action cannot be undone. All your data will be permanently deleted.
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Top Up Modal */}
            <AnimatePresence>
              {showTopUp && (
                <motion.div
                  className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <motion.div
                    initial={{ scale: 0.9 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0.9 }}
                    className="bg-white p-6 rounded-2xl shadow-xl w-80 relative"
                  >
                    {!showQR ? (
                      <>
                        <h3 className="text-lg font-bold text-gray-800 mb-4 text-center">
                          Top Up via ABA Bank
                        </h3>
                        <input
                          type="number"
                          placeholder="Enter amount (USD)"
                          value={topUpAmount}
                          onChange={(e) => setTopUpAmount(e.target.value)}
                          className="w-full border rounded-lg px-4 py-2 mb-4"
                        />
                        <div className="flex justify-end space-x-2">
                          <button
                            onClick={() => setShowTopUp(false)}
                            className="px-3 py-2 bg-gray-200 rounded-lg"
                          >
                            Cancel
                          </button>
                          <button
                            onClick={handleTopUp}
                            className="px-4 py-2 bg-green-800 text-white rounded-lg hover:bg-green-900 transition"
                          >
                            Generate QR
                          </button>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="flex flex-col items-center ">
                          <img
                            src="public/Logo/OIP.webp"
                            alt="ABA Logo"
                            className="w-16 mb-3 rounded-md"
                          />
                          <h3 className="text-lg font-semibold text-gray-800 text-center mb-2">
                            Scan with ABA App
                          </h3>
                          <p className="text-center text-sm text-gray-600 mb-2">
                            Amount: ${qrData?.amount || topUpAmount}
                          </p>
                          <p className="text-center text-sm text-gray-600 mb-3">
                            Time left: {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
                          </p>
                          {qrData?.qr_image && (
                            <img
                              src={qrData.qr_image}
                              alt="ABA QR Code"
                              className="mx-auto mb-4 border rounded-lg w-48"
                            />
                          )}
                          {!showSuccess ? (
                            <div className="flex justify-center space-x-2 w-full">
                              <button
                                onClick={handleCancelPayment}
                                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                              >
                                Cancel
                              </button>
                            </div>
                          ) : (
                            <motion.div
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              className="text-center text-green-700 font-semibold mt-2"
                            >
                              ✅ Payment Successful!
                            </motion.div>
                          )}
                        </div>
                      </>
                    )}
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </div>
  );
}
