import React, { useState, useEffect } from "react";
import { FaStar, FaShoppingCart } from "react-icons/fa";
import { useSearchParams, Link, useLocation } from "react-router-dom";
import products from "../data/products";

export default function Shop() {
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const selectedCategory = searchParams.get("category");
  const searchQuery = searchParams.get("search");
  const stateCategories = location.state?.categories || [];

  const [productsState] = useState(products);
  const [addedIds, setAddedIds] = useState(() => {
    try {
      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      return cart.map((p) => p.id);
    } catch {
      return [];
    }
  });

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [orderCode, setOrderCode] = useState("");
  const [reviewsData, setReviewsData] = useState({});

  // ✅ Filter products
  let filteredProducts = products;

  if (stateCategories.length > 0) {
    filteredProducts = products.filter((product) =>
      stateCategories.includes(product.category)
    );
  } else if (selectedCategory && selectedCategory !== "All Products") {
    filteredProducts = products.filter((product) =>
      Array.isArray(product.category)
        ? product.category.includes(selectedCategory)
        : product.category === selectedCategory
    );
  }

  if (searchQuery) {
    filteredProducts = filteredProducts.filter((product) =>
      product.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  const generateOrderCode = () =>
    "SKN-" + Math.random().toString(36).substring(2, 8).toUpperCase();

  const handleBuy = (item) => {
    setSelectedProduct(item);
    setOrderCode(generateOrderCode());
  };

  const handleConfirm = () => setSelectedProduct(null);
  const handleCancel = () => setSelectedProduct(null);

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
      const updated = cart.filter((p) => p.id !== item.id);
      localStorage.setItem("cart", JSON.stringify(updated));
      setAddedIds(updated.map((p) => p.id));
      window.dispatchEvent(new Event("cartUpdated"));
      return;
    }
    cart.push({ ...item, quantity: 1 });
    localStorage.setItem("cart", JSON.stringify(cart));
    setAddedIds(cart.map((p) => p.id));
    window.dispatchEvent(new Event("cartUpdated"));
  };

  useEffect(() => {
    const handler = () => {
      try {
        const cart = JSON.parse(localStorage.getItem("cart")) || [];
        setAddedIds(cart.map((p) => p.id));
      } catch {
        setAddedIds([]);
      }
    };
    window.addEventListener("cartUpdated", handler);
    return () => window.removeEventListener("cartUpdated", handler);
  }, []);

  useEffect(() => {
    const reviews = {};
    products.forEach((product) => {
      const productReviews = localStorage.getItem(`reviews_${product.id}`);
      if (productReviews) {
        reviews[product.id] = JSON.parse(productReviews);
      }
    });
    setReviewsData(reviews);
  }, []);

  return (
    <div id="bodybg" className="min-h-screen flex flex-col items-center py-10">
      <div className="text-center mb-16 px-4">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
          {searchQuery
            ? `Search Results for "${searchQuery}"`
            : location.state?.fromSection === "ShopRelated"
            ? "Shop Related Products"
            : `About ${
                stateCategories.length > 0
                  ? stateCategories.join(", ")
                  : selectedCategory || "All Products"
              } Collection`}
        </h1>

        <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
          {searchQuery
            ? "Browse to find what you need."
            : location.state?.fromSection === "ShopRelated"
            ? "Discover expert-approved skincare products."
            : "Find your perfect skincare match."}
        </p>
      </div>

      {/* ✅ Product Cards */}
      <div className="w-full max-w-7xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((item) => (
            <Link
              key={item.id}
              to={`/product/${item.id}`}
              className="bg-white rounded-3xl shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 overflow-hidden cursor-pointer"
            >
              <div className="relative">
                <img
                  src={item.images[0]}
                  alt={item.title}
                  className="w-full h-60 object-contain p-6 bg-[#7e4b172e]"
                />

                <div className="absolute top-4 right-4 bg-white/80 backdrop-blur-md rounded-full p-2 shadow-sm">
                  <FaShoppingCart
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      handleAddToCart(item);
                    }}
                    className={`${
                      addedIds.includes(item.id)
                        ? "text-green-500"
                        : "text-gray-400 hover:text-green-500"
                    } transition-colors duration-200 cursor-pointer`}
                  />
                </div>
              </div>

              <div className="p-2 flex flex-col items-center text-center">
                <h3 className="font-semibold text-lg text-[#08172b] mb-1 line-clamp-2">
                  {item.title}
                </h3>

                {renderStars(
                  reviewsData[item.id]?.length
                    ? reviewsData[item.id].reduce((s, r) => s + r.rating, 0) /
                        reviewsData[item.id].length
                    : item.rating
                )}

                <p className="text-gray-400 text-sm mb-2">
                  {Array.isArray(item.category)
                    ? item.category.join(", ")
                    : item.category}
                </p>

                <p className="text-[#0a1a2f] font-bold text-xl mb-2">
                  ${item.price}
                </p>

                <button
                  id="btn"
                  onClick={(e) => {
                    e.preventDefault();
                    handleBuy(item);
                  }}
                  className="flex-1 bg-green-900 hover:bg-green-800 text-white py-2 px-12 rounded-full text-sm font-medium shadow-md hover:shadow-lg hover:scale-105 transition-all"
                >
                  Buy
                </button>
              </div>
            </Link>
          ))
        ) : (
          <div className="col-span-full text-center py-16">
            <p className="text-gray-500 text-xl mb-4">No products found</p>
            <p className="text-gray-400">Try changing your search</p>
          </div>
        )}
      </div>

      {/* ✅ Buy Popup */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 shadow-2xl w-[90%] max-w-md text-center">
            <h2 className="text-xl font-bold text-[#0a1a2f] mb-4">
              Confirm Buy
            </h2>
            <p className="text-gray-600 mb-2">
              <strong>Product:</strong> {selectedProduct.title}
            </p>
            <p className="text-gray-600 mb-4">
              <strong>Order Code:</strong> {orderCode}
            </p>

            <div className="flex justify-center gap-4 mt-6">
              <button
                onClick={handleConfirm}
                className="bg-red-600 hover:bg-red-500 text-white px-6 py-2 rounded-full shadow-md hover:shadow-lg hover:scale-105 transition"
              >
                Confirm
              </button>
              <button
                onClick={handleCancel}
                className="bg-gray-500 hover:bg-gray-400 text-white px-6 py-2 rounded-full shadow-md hover:shadow-lg hover:scale-105 transition"
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
