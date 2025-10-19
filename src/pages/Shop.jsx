<<<<<<< HEAD
import React, { useState } from "react";
import { FaStar } from "react-icons/fa"; // ⭐ Add this for star icons

export default function Shop() {
  const [products] = useState([
    // 🌿 Cleanser (1–5)

    { id: 1, title: "Heartleaf Quercetinol Deep Cleansing Foam (150ml)", price: 15.00, category: "Cleanser", rating: 4.5, images: ["public/Cleanser/anua.png"] },
    { id: 2, title: "Hydrating Gel Cleanser", price: 12.5, category: "Cleanser", rating: 4.8, images: ["/images/cleanser2.png"] },
    { id: 3, title: "Brightening Cleanser", price: 11.99, category: "Cleanser", rating: 4.2, images: ["/images/cleanser3.png"] },
    { id: 4, title: "Deep Pore Cleanser", price: 13.99, category: "Cleanser", rating: 4.7, images: ["/images/cleanser4.png"] },
    { id: 5, title: "Soothing Cleanser", price: 9.99, category: "Cleanser", rating: 4.3, images: ["/images/cleanser5.png"] },
    // Tonner
    { id: 6, title: "Rose Water Toner", price: 9.5, category: "Toner", rating: 4.6, images: ["/images/toner1.png"] },
    { id: 7, title: "Green Tea Toner", price: 10.5, category: "Toner", rating: 4.7, images: ["/images/toner2.png"] },
    { id: 8, title: "Hydrating Toner", price: 11.0, category: "Toner", rating: 4.4, images: ["/images/toner3.png"] },
    { id: 9, title: "Aloe Refresh Toner", price: 9.99, category: "Toner", rating: 4.2, images: ["/images/toner4.png"] },
    { id: 10, title: "Vitamin Toner", price: 12.0, category: "Toner", rating: 4.8, images: ["/images/toner5.png"] },
    // Surum
    { id: 11, title: "Vitamin C Serum", price: 19.99, category: "Serum", rating: 4.9, images: ["/images/serum1.png"] },
    { id: 12, title: "Hyaluronic Serum", price: 17.5, category: "Serum", rating: 4.6, images: ["/images/serum2.png"] },
    { id: 13, title: "Niacinamide Serum", price: 18.99, category: "Serum", rating: 4.5, images: ["/images/serum3.png"] },
    { id: 14, title: "Anti-Aging Serum", price: 20.0, category: "Serum", rating: 4.9, images: ["/images/serum4.png"] },
    { id: 15, title: "Bright Boost Serum", price: 22.0, category: "Serum", rating: 4.7, images: ["/images/serum5.png"] },
    //  Sunscreen
    { id: 16, title: "Daily UV Defense", price: 15.5, category: "Sunscreen", rating: 4.4, images: ["/images/sunscreen1.png"] },
    { id: 17, title: "Aqua Sun Shield", price: 14.99, category: "Sunscreen", rating: 4.5, images: ["/images/sunscreen2.png"] },
    { id: 18, title: "Matte Finish SPF 50", price: 16.5, category: "Sunscreen", rating: 4.8, images: ["/images/sunscreen3.png"] },
    { id: 19, title: "Light Moist SPF 30", price: 13.5, category: "Sunscreen", rating: 4.3, images: ["/images/sunscreen4.png"] },
    { id: 20, title: "Sensitive Skin SPF", price: 15.0, category: "Sunscreen", rating: 4.7, images: ["/images/sunscreen5.png"] },

    { id: 21, title: "Aloe Vera Moisturizer", price: 12.99, category: "Moisturizer", rating: 4.8, images: ["/images/moist1.png"] },
    { id: 22, title: "Hydra Boost Cream", price: 13.5, category: "Moisturizer", rating: 4.7, images: ["/images/moist2.png"] },
    { id: 23, title: "Light Daily Cream", price: 11.5, category: "Moisturizer", rating: 4.3, images: ["/images/moist3.png"] },
    { id: 24, title: "Collagen Moist Cream", price: 15.5, category: "Moisturizer", rating: 4.6, images: ["/images/moist4.png"] },
    { id: 25, title: "Oil-Free Moist Gel", price: 10.99, category: "Moisturizer", rating: 4.4, images: ["/images/moist5.png"] },

    { id: 26, title: "Charcoal Detox Mask", price: 8.5, category: "Face Mask", rating: 4.5, images: ["/images/mask1.png"] },
    { id: 27, title: "Clay Purify Mask", price: 9.0, category: "Face Mask", rating: 4.4, images: ["/images/mask2.png"] },
    { id: 28, title: "Hydrating Sheet Mask", price: 7.5, category: "Face Mask", rating: 4.3, images: ["/images/mask3.png"] },
    { id: 29, title: "Vitamin Mask", price: 8.0, category: "Face Mask", rating: 4.5, images: ["/images/mask4.png"] },
    { id: 30, title: "Bright Glow Mask", price: 9.5, category: "Face Mask", rating: 4.6, images: ["/images/mask5.png"] },

    { id: 31, title: "Anti-Wrinkle Eye Cream", price: 14.0, category: "Eye Cream", rating: 4.8, images: ["/images/eye1.png"] },
    { id: 32, title: "Hydra Eye Gel", price: 13.0, category: "Eye Cream", rating: 4.5, images: ["/images/eye2.png"] },
    { id: 33, title: "Bright Eye Serum", price: 15.0, category: "Eye Cream", rating: 4.6, images: ["/images/eye3.png"] },
    { id: 34, title: "Caffeine Eye Cream", price: 12.5, category: "Eye Cream", rating: 4.4, images: ["/images/eye4.png"] },
    { id: 35, title: "Soothing Eye Balm", price: 14.5, category: "Eye Cream", rating: 4.5, images: ["/images/eye5.png"] },

    { id: 36, title: "Peach Glow Blush", price: 9.99, category: "Blush", rating: 4.6, images: ["/images/blush1.png"] },
    { id: 37, title: "Rose Pink Blush", price: 10.5, category: "Blush", rating: 4.7, images: ["/images/blush2.png"] },
    { id: 38, title: "Coral Shine Blush", price: 9.5, category: "Blush", rating: 4.3, images: ["/images/blush3.png"] },
    { id: 39, title: "Natural Tone Blush", price: 11.0, category: "Blush", rating: 4.4, images: ["/images/blush4.png"] },
    { id: 40, title: "Matte Finish Blush", price: 10.99, category: "Blush", rating: 4.6, images: ["/images/blush5.png"] },

    { id: 41, title: "Golden Glow Highlighter", price: 11.99, category: "Highlighter", rating: 4.7, images: ["/images/high1.png"] },
    { id: 42, title: "Shimmer Beam", price: 12.5, category: "Highlighter", rating: 4.6, images: ["/images/high2.png"] },
    { id: 43, title: "Soft Glow Stick", price: 10.5, category: "Highlighter", rating: 4.5, images: ["/images/high3.png"] },
    { id: 44, title: "Radiant Highlighter", price: 13.0, category: "Highlighter", rating: 4.8, images: ["/images/high4.png"] },
    { id: 45, title: "Diamond Shine", price: 14.0, category: "Highlighter", rating: 4.9, images: ["/images/high5.png"] },

    { id: 46, title: "Vanilla Lip Balm", price: 5.5, category: "Lip Balm", rating: 4.4, images: ["/images/lip1.png"] },
    { id: 47, title: "Strawberry Lip Balm", price: 6.0, category: "Lip Balm", rating: 4.5, images: ["/images/lip2.png"] },
    { id: 48, title: "Coconut Lip Balm", price: 5.8, category: "Lip Balm", rating: 4.6, images: ["/images/lip3.png"] },
    { id: 49, title: "Mint Lip Balm", price: 6.2, category: "Lip Balm", rating: 4.3, images: ["/images/lip4.png"] },
    { id: 50, title: "Honey Lip Balm", price: 5.9, category: "Lip Balm", rating: 4.7, images: ["/images/lip5.png"] },
  ]);


  const [selectedProduct, setSelectedProduct] = useState(null);
  const [orderCode, setOrderCode] = useState("");

  const generateOrderCode = () =>
    "SKN-" + Math.random().toString(36).substring(2, 8).toUpperCase();

  const handleBuy = (item) => {
    setSelectedProduct(item);
    setOrderCode(generateOrderCode());
  };

  const handleConfirm = () => {
    alert(`✅ Order Confirmed!\nProduct: ${selectedProduct.title}\nCode: ${orderCode}`);
    setSelectedProduct(null);
  };

  const handleCancel = () => {
    setSelectedProduct(null);
  };

  // ⭐ Function to display rating stars
  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating - fullStars >= 0.5;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

    return (
      <div className="flex justify-center items-center mb-2">
        {[...Array(fullStars)].map((_, i) => (
          <FaStar key={`full-${i}`} className="text-yellow-400 text-sm" />
        ))}
        {halfStar && <FaStar className="text-yellow-300 text-sm opacity-70" />}
        {[...Array(emptyStars)].map((_, i) => (
          <FaStar key={`empty-${i}`} className="text-gray-300 text-sm" />
        ))}
        <span className="text-gray-500 text-xs ml-1">({rating.toFixed(1)})</span>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#e6f3ff] to-white flex flex-col items-center py-14 px-6">
      {/* 🛍 Header */}
      <h1 className="text-4xl md:text-5xl font-semibold text-[#0a1a2f] mb-3 text-center">
        Natural Skincare
      </h1>
      <p className="text-gray-500 text-lg mb-14 text-center max-w-2xl">
        Simple, modern and effective skincare for your beauty routine.
      </p>

      {/* 💧 Product Grid */}
      <div className="w-full max-w-7xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {products.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 p-6 flex flex-col items-center"
          >
            <img
              src={item.images[0]}
              alt={item.title}
              className="w-full h-52 object-contain mb-4"
            />
            <h3 className="font-medium text-lg text-[#0a1a2f] mb-1 text-center line-clamp-2">
              {item.title}
            </h3>

            {renderStars(item.rating)}

            <p className="text-gray-400 text-sm mb-2">{item.category}</p>
            <p className="text-[#0a1a2f] font-semibold text-lg mb-4">
              ${item.price}
            </p>
            <button
              onClick={() => handleBuy(item)}
              className="bg-slate-600 hover:bg-slate-400 text-white px-5 py-2.5 rounded-full text-sm font-medium transition-all"
            >
              Buy Now
            </button>
          </div>
        ))}
      </div>

      {/* 🌟 Confirmation Popup */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
          <div className="bg-white rounded-2xl shadow-lg w-80 sm:w-96 p-8 text-center animate-fadeIn">
            <h2 className="text-xl font-semibold text-[#0a1a2f] mb-4">
              Confirm Your Order
            </h2>
            <p className="text-gray-500 mb-3">{selectedProduct.title}</p>
            <p className="text-gray-400 text-sm mb-6">
              Order Code: <span className="font-mono text-[#007bff]">{orderCode}</span>
            </p>

            <div className="flex justify-center gap-4">
              <button
                onClick={handleConfirm}
                className="bg-[#007bff] hover:bg-[#005fcc] text-white px-5 py-2 rounded-full font-medium transition-all"
              >
                Confirm
              </button>
              <button
                onClick={handleCancel}
                className="border border-gray-300 hover:bg-gray-100 text-gray-700 px-5 py-2 rounded-full font-medium transition-all"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
=======

>>>>>>> 92aed22d6a3af610026c06789fafc53a4e4c515a
