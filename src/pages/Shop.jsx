import React, { useState, useEffect } from "react";
import { FaStar, FaHeart } from "react-icons/fa";
import { useSearchParams } from "react-router-dom";

export default function Shop() {
  const [searchParams] = useSearchParams();
  const selectedCategory = searchParams.get('category');

  const [products] = useState([
    // 🌿 Cleanser (1–5)
    { id: 1, title: "ANUA Deep Cleansing", price: 15.0, category: "Cleanser", rating: 4.5, images: ["public/Cleanser/Anua-removebg-preview (1).png"] },
    { id: 2, title: "Hydrating Gel Cleanser", price: 12.5, category: "Cleanser", rating: 4.8, images: ["public/Cleanser/Hydrating_Gel_Cleanser-removebg-preview.png"] },
    { id: 3, title: "Brightening Cleanser", price: 11.99, category: "Cleanser", rating: 4.2, images: ["public/Cleanser/Anua-HeartleafPoreControlCleansingOil-removebg-preview.png"] },
    { id: 4, title: "Deep Pore Cleanser", price: 13.99, category: "Cleanser", rating: 4.7, images: ["public/Cleanser/Deep_Pore_Cleanser-removebg-preview.png"] },
    { id: 5, title: "Softing Cleanser", price: 9.99, category: "Cleanser", rating: 4.3, images: ["public/Cleanser/Softting.png"] },

    // 🌸 Toner (6–10)
    { id: 6, title: "[ANUA] Heartleaf 77% Soothing Toner 250ml | 500ml", price: 18.5, category: "Toner", rating: 4.6, images: ["public/Toner/Anua-Heartleaf-77-Soothing-Toner-250ml-2-removebg-preview.png"] },
    { id: 7, title: "Green Tea Toner", price: 10.5, category: "Toner", rating: 4.7, images: ["public/Toner/SOME-removebg-preview.png"] },
    { id: 8, title: "Hydrating Toner", price: 11.0, category: "Toner", rating: 4.4, images: ["public/Toner/1004.png"] },
    { id: 9, title: "Aloe Refresh Toner", price: 9.99, category: "Toner", rating: 4.2, images: ["public/Toner/Aloe.png"] },
    { id: 10, title: "Vitamin Toner", price: 12.0, category: "Toner", rating: 4.8, images: ["public/Toner/CeraVe_Hydrating_Toner.png"] },

    // 💧 Serum (11–15)
    { id: 11, title: "Vitamin C Serum", price: 19.99, category: "Serum", rating: 4.9, images: ["/images/serum1.png"] },
    { id: 12, title: "Hyaluronic Serum", price: 17.5, category: "Serum", rating: 4.6, images: ["/images/serum2.png"] },
    { id: 13, title: "Niacinamide Serum", price: 18.99, category: "Serum", rating: 4.5, images: ["/images/serum3.png"] },
    { id: 14, title: "Anti-Aging Serum", price: 20.0, category: "Serum", rating: 4.9, images: ["/images/serum4.png"] },
    { id: 15, title: "Bright Boost Serum", price: 22.0, category: "Serum", rating: 4.7, images: ["/images/serum5.png"] },

    // ☀️ Sunscreen (16–20)
    { id: 16, title: "Daily UV Defense", price: 15.5, category: "Sunscreen", rating: 4.4, images: ["/images/sunscreen1.png"] },
    { id: 17, title: "Aqua Sun Shield", price: 14.99, category: "Sunscreen", rating: 4.5, images: ["/images/sunscreen2.png"] },
    { id: 18, title: "Matte Finish SPF 50", price: 16.5, category: "Sunscreen", rating: 4.8, images: ["/images/sunscreen3.png"] },
    { id: 19, title: "Light Moist SPF 30", price: 13.5, category: "Sunscreen", rating: 4.3, images: ["/images/sunscreen4.png"] },
    { id: 20, title: "Sensitive Skin SPF", price: 15.0, category: "Sunscreen", rating: 4.7, images: ["/images/sunscreen5.png"] },

    // 💦 Moisturizer (21–25)
    { id: 21, title: "Aloe Vera Moisturizer", price: 12.99, category: "Moisturizer", rating: 4.8, images: ["public/Moisturizer/ALoe.png"] },
    { id: 22, title: "Hydra Boost Cream", price: 13.5, category: "Moisturizer", rating: 4.7, images: ["public/Moisturizer/cerave.png"] },
    { id: 23, title: "Light Daily Cream", price: 11.5, category: "Moisturizer", rating: 4.3, images: ["/public/Moisturizer/3.png"] },
    { id: 24, title: "Collagen Moist Cream", price: 15.5, category: "Moisturizer", rating: 4.6, images: ["public/Moisturizer/isntree.png"] },
    { id: 25, title: "Oil-Free Moist Gel", price: 10.99, category: "Moisturizer", rating: 4.4, images: ["public/Moisturizer/Skin 1004.webp"] },

    // 🧖 Face Mask (26–30)
    { id: 26, title: "Charcoal Detox Mask", price: 8.5, category: "Face Mask", rating: 4.5, images: ["/images/mask1.png"] },
    { id: 27, title: "Clay Purify Mask", price: 9.0, category: "Face Mask", rating: 4.4, images: ["/images/mask2.png"] },
    { id: 28, title: "Hydrating Sheet Mask", price: 7.5, category: "Face Mask", rating: 4.3, images: ["/images/mask3.png"] },
    { id: 29, title: "Vitamin Mask", price: 8.0, category: "Face Mask", rating: 4.5, images: ["/images/mask4.png"] },
    { id: 30, title: "Bright Glow Mask", price: 9.5, category: "Face Mask", rating: 4.6, images: ["/images/mask5.png"] },

    // 👁 Eye Cream (31–35)
    { id: 31, title: "Anti-Wrinkle Eye Cream", price: 14.0, category: "Eye Cream", rating: 4.8, images: ["/images/eye1.png"] },
    { id: 32, title: "Hydra Eye Gel", price: 13.0, category: "Eye Cream", rating: 4.5, images: ["/images/eye2.png"] },
    { id: 33, title: "Bright Eye Serum", price: 15.0, category: "Eye Cream", rating: 4.6, images: ["/images/eye3.png"] },
    { id: 34, title: "Caffeine Eye Cream", price: 12.5, category: "Eye Cream", rating: 4.4, images: ["/images/eye4.png"] },
    { id: 35, title: "Soothing Eye Balm", price: 14.5, category: "Eye Cream", rating: 4.5, images: ["/images/eye5.png"] },

    // 🌸 Blush (36–40)
    { id: 36, title: "Peach Glow Blush", price: 9.99, category: "Blush", rating: 4.6, images: ["/images/blush1.png"] },
    { id: 37, title: "Rose Pink Blush", price: 10.5, category: "Blush", rating: 4.7, images: ["/images/blush2.png"] },
    { id: 38, title: "Coral Shine Blush", price: 9.5, category: "Blush", rating: 4.3, images: ["/images/blush3.png"] },
    { id: 39, title: "Natural Tone Blush", price: 11.0, category: "Blush", rating: 4.4, images: ["/images/blush4.png"] },
    { id: 40, title: "Matte Finish Blush", price: 10.99, category: "Blush", rating: 4.6, images: ["/images/blush5.png"] },

    // ✨ Highlighter (41–45)
    { id: 41, title: "Golden Glow Highlighter", price: 11.99, category: "Highlighter", rating: 4.7, images: ["/images/high1.png"] },
    { id: 42, title: "Shimmer Beam", price: 12.5, category: "Highlighter", rating: 4.6, images: ["/images/high2.png"] },
    { id: 43, title: "Soft Glow Stick", price: 10.5, category: "Highlighter", rating: 4.5, images: ["/images/high3.png"] },
    { id: 44, title: "Radiant Highlighter", price: 13.0, category: "Highlighter", rating: 4.8, images: ["/images/high4.png"] },
    { id: 45, title: "Diamond Shine", price: 14.0, category: "Highlighter", rating: 4.9, images: ["/images/high5.png"] },

    // 💋 Lip Balm (46–50)
    { id: 46, title: "Vanilla Lip Balm", price: 5.5, category: "Lip Balm", rating: 4.4, images: ["/images/lip1.png"] },
    { id: 47, title: "Strawberry Lip Balm", price: 6.0, category: "Lip Balm", rating: 4.5, images: ["/images/lip2.png"] },
    { id: 48, title: "Coconut Lip Balm", price: 5.8, category: "Lip Balm", rating: 4.6, images: ["/images/lip3.png"] },
    { id: 49, title: "Mint Lip Balm", price: 6.2, category: "Lip Balm", rating: 4.3, images: ["/images/lip4.png"] },
    { id: 50, title: "Honey Lip Balm", price: 5.9, category: "Lip Balm", rating: 4.7, images: ["/images/lip5.png"] },
  ]);

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [orderCode, setOrderCode] = useState("");

  const filteredProducts = selectedCategory && selectedCategory !== 'All Products'
    ? products.filter(product => product.category === selectedCategory)
    : products;

  const generateOrderCode = () =>
    "SKN-" + Math.random().toString(36).substring(2, 8).toUpperCase();

  const handleBuy = (item) => {
    setSelectedProduct(item);
    setOrderCode(generateOrderCode());
  };

  const handleConfirm = () => {
    alert(`✅ Added to Cart!\nProduct: ${selectedProduct.title}\nCode: ${orderCode}`);
    setSelectedProduct(null);
  };

  const handleCancel = () => {
    setSelectedProduct(null);
  };

  // ⭐ Function to render stars
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
 <div   className="  min-h-screen bg- flex flex-col items-center py-10">
   <h1 className="text-2xl   text-[#1e385b] mb-10 font-serif">
       About {selectedCategory && selectedCategory !== 'All Products' ? selectedCategory : 'All Products'}
   </h1>

   <div className="w-full max-w-7xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
     {filteredProducts.map((item) => (
        <div
          key={item.id}
          className="bg-white rounded-3xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 overflow-hidden"
        >
          <div className="relative">
            <img
              src={item.images[0]}
              alt={item.title}
              className="w-full h-60 object-contain p-6 bg-gradient-to-b from-[#f9fcff] to-[#eef5ff]"
            />
            <div className="absolute top-4 right-4 bg-white/80 backdrop-blur-md rounded-full p-2 shadow-sm">
              <FaHeart className="text-gray-400 hover:text-red-500 transition-all cursor-pointer" />
            </div>
          </div>

          <div className="p-6 flex flex-col items-center text-center">
            <h3 className="font-semibold text-lg text-[#0a1a2f] mb-1 line-clamp-2">
              {item.title}
            </h3>
            {renderStars(item.rating)}
            <p className="text-gray-400 text-sm mb-2">{item.category}</p>
            <p className="text-[#0a1a2f] font-bold text-xl mb-4">${item.price}</p>

            <button
              onClick={() => handleBuy(item)}
              className="w-full bg-gradient-to-r from-[#5a8dee] to-[#007bff] hover:from-[#007bff] hover:to-[#5a8dee] text-white py-2.5 rounded-full text-sm font-medium shadow-md hover:shadow-lg transition-all duration-300"
            >
              Add to Cart
            </button>
          </div>
        </div>
      ))}
    </div>

    {/* Popup */}
    {selectedProduct && (
      <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
        <div className="bg-white rounded-2xl p-8 shadow-2xl w-[90%] max-w-md text-center">
          <h2 className="text-xl font-bold text-[#0a1a2f] mb-4">Confirm Add to Cart</h2>
          <p className="text-gray-600 mb-2">
            <strong>Product:</strong> {selectedProduct.title}
          </p>
          <p className="text-gray-600 mb-4">
            <strong>Order Code:</strong> {orderCode}
          </p>

          <div className="flex justify-center gap-4 mt-6">
            <button
              onClick={handleConfirm}
              className="bg-[#007bff] hover:bg-[#5a8dee] text-white px-6 py-2 rounded-full shadow"
            >
              Confirm
            </button>
            <button
              onClick={handleCancel}
              className="bg-gray-300 hover:bg-gray-400 text-[#0a1a2f] px-6 py-2 rounded-full shadow"
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