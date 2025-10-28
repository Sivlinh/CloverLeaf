import React, { useState, useEffect } from "react";
import { FaStar, FaHeart } from "react-icons/fa";
import { useSearchParams, Link } from "react-router-dom";
import products from "../data/products";

export default function Shop() {
  const [searchParams] = useSearchParams();
  const selectedCategory = searchParams.get('category');
  const searchQuery = searchParams.get('search');
  const [productsState] = useState(products);
  const [addedIds, setAddedIds] = useState(() => {
    try {
      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      return cart.map((p) => p.id);
    } catch (e) {
      return [];
    }
  });

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [orderCode, setOrderCode] = useState("");

  // ✅ Filter products by category (supports array or string)
  let filteredProducts = selectedCategory && selectedCategory !== 'All Products'
    ? products.filter(product => 
        Array.isArray(product.category)
          ? product.category.includes(selectedCategory)
          : product.category === selectedCategory
      )
    : products;

  // Apply search filter if search query exists
  if (searchQuery) {
    filteredProducts = filteredProducts.filter(product =>
      product.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  const generateOrderCode = () =>
    "SKN-" + Math.random().toString(36).substring(2, 8).toUpperCase();

  const handleBuy = (item) => {
    setSelectedProduct(item);
    setOrderCode(generateOrderCode());
  };

  const handleConfirm = () => {
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

  const handleAddToCart = (item) => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const exists = cart.find((p) => p.id === item.id);
    if (exists) {
      // remove it
      const updated = cart.filter((p) => p.id !== item.id);
      localStorage.setItem("cart", JSON.stringify(updated));
      setAddedIds(updated.map((p) => p.id));
      window.dispatchEvent(new Event("cartUpdated"));
      return;
    }
    // add it
    cart.push({ ...item, quantity: 1 });
    localStorage.setItem("cart", JSON.stringify(cart));
    setAddedIds(cart.map((p) => p.id));
    window.dispatchEvent(new Event("cartUpdated"));
  };

  // keep addedIds in sync when other components update the cart
  useEffect(() => {
    const handler = () => {
      try {
        const cart = JSON.parse(localStorage.getItem("cart")) || [];
        setAddedIds(cart.map((p) => p.id));
      } catch (e) {
        setAddedIds([]);
      }
    };
    window.addEventListener("cartUpdated", handler);
    return () => window.removeEventListener("cartUpdated", handler);
  }, []);

  return (
    <div id="bodybg" className="min-h-screen flex flex-col items-center py-10 bg-[#fffaf5] animate-fade-in">
      <h1 id="fontcolor" className="text-2xl text-gray-800 mb-10 font-semibold">
        {searchQuery
          ? `Search Results for "${searchQuery}"`
          : ` About  ${selectedCategory && selectedCategory !== 'All Products'
              ? selectedCategory
              : 'All Products'}  Collection`}
      </h1>

      <div className="w-full max-w-7xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((item) => (
            <Link
              key={item.id}
              to={`/product/${item.id}`}
              className="bg-white rounded-3xl shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-300 overflow-hidden cursor-pointer"
            >
              <div className="relative">
                <img
                  src={item.images[0]}
                  alt={item.title}
                  className="w-full h-60 object-contain p-6 bg-gradient-to-b from-[#f9fcff] to-[#eef5ff]"
                />
                <div className="absolute top-4 right-4 bg-white/80 backdrop-blur-md rounded-full p-2 shadow-sm">
                  <FaHeart
                    onClick={(e) => {
                      e.stopPropagation();
                      e.preventDefault();
                      handleAddToCart(item);
                    }}
                    className={`${addedIds.includes(item.id)
                      ? 'text-red-500'
                      : 'text-gray-400 hover:text-red-500'
                      } transition-colors duration-200 cursor-pointer`}
                  />
                </div>
              </div>

              <div className="p-2 flex flex-col items-center text-center">
                <h3 className="font-semibold text-lg text-[#0a1a2f] mb-1 line-clamp-2">
                  {item.title}
                </h3>
                {renderStars(item.rating)}
                <p className="text-gray-400 text-sm mb-2">
                  {Array.isArray(item.category) ? item.category.join(", ") : item.category}
                </p>
                <p className="text-[#0a1a2f] font-bold text-xl mb-2">
                  ${item.price}
                </p>

                <button
                  onClick={(e) => { e.preventDefault(); handleBuy(item); }}
                 className="flex-1 bg-green-900 hover:bg-green-800 text-white py-2 px-8 rounded-full text-sm font-medium shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
>
                  Buy
                </button>
              </div>
            </Link>
          ))
        ) : (
          <div className="col-span-full text-center py-16">
            <p className="text-gray-500 text-xl mb-4">No products found</p>
            <p className="text-gray-400">Try adjusting your search terms</p>
          </div>
        )}
      </div>

      {/* Popup */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 shadow-2xl w-[90%] max-w-md text-center">
            <h2 className="text-xl font-bold text-[#0a1a2f] mb-4">Confirm Buy</h2>
            <p className="text-gray-600 mb-2">
              <strong>Product:</strong> {selectedProduct.title}
            </p>
            <p className="text-gray-600 mb-4">
              <strong>Order Code:</strong> {orderCode}
            </p>

            <div className="flex justify-center gap-4 mt-6">
              <button
                onClick={handleConfirm}
                className="bg-green-900 hover:bg-green-800 text-white px-6 py-2 rounded-full shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
              >
                Confirm
              </button>
              <button
                onClick={handleCancel}
                className="bg-gray-500 hover:bg-gray-400 text-white px-6 py-2 rounded-full shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
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
