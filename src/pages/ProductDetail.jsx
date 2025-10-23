import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { FaStar, FaHeart } from "react-icons/fa";
import products from "../data/products";

export default function ProductDetail() {
  const { id } = useParams();
  const product = products.find((p) => p.id === parseInt(id));
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [orderCode, setOrderCode] = useState("");

  // Generate random order code
  const generateOrderCode = () => {
    return `ORD-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
  };

  const handleAddToCart = (item) => {
   const cart = JSON.parse(localStorage.getItem("cart")) || [];

   // prevent duplicate product
   const exists = cart.find((p) => p.id === item.id);
   if (exists) {
     // alert("❤️ This product is already in your cart!");
     return;
   }

   cart.push(item);
   localStorage.setItem("cart", JSON.stringify(cart));
   // Dispatch custom event to update cart count in Nav
   window.dispatchEvent(new Event("cartUpdated"));
   // alert(`🛒 Added "${item.title}" to your cart!`);
 };

  const handleBuy = (item) => {
    setSelectedProduct(item);
    setOrderCode(generateOrderCode());
  };

  const handleConfirm = () => {
    // alert(`✅ Order Confirmed!\nProduct: ${selectedProduct.title}\nPrice: $${selectedProduct.price}\nOrder Code: ${orderCode}`);
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
      <div className="flex justify-center items-center mb-4">
        {[...Array(fullStars)].map((_, i) => (
          <FaStar key={`full-${i}`} className="text-yellow-400 text-lg" />
        ))}
        {halfStar && <FaStar className="text-yellow-300 text-lg opacity-70" />}
        {[...Array(emptyStars)].map((_, i) => (
          <FaStar key={`empty-${i}`} className="text-gray-300 text-lg" />
        ))}
        <span className="text-gray-500 text-sm ml-2">({rating.toFixed(1)})</span>
      </div>
    );
  };

  if (!product) return <p className="text-center mt-10">Product not found.</p>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f9fcff] to-[#eef5ff] py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <Link
          to="/shop"
          className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-[#5a8dee] to-[#007bff] text-white rounded-full font-semibold shadow-lg hover:from-[#007bff] hover:to-[#5a8dee] transition-all duration-300 mb-8"
        >
          ← Go to Shop
        </Link>

        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          <div className="flex flex-col lg:flex-row">
            {/* Product Image */}
            <div className="lg:w-1/2 p-8 bg-gradient-to-br from-[#f9fcff] to-[#eef5ff] flex items-center justify-center">
              <img
                src={product.images[0]}
                alt={product.title}
                className="w-full max-w-md h-96 object-contain rounded-2xl shadow-lg"
              />
            </div>

            {/* Product Details */}
            <div className="lg:w-1/2 p-8 flex flex-col justify-center">
              <h2 className="text-4xl font-bold text-[#0a1a2f] mb-4">{product.title}</h2>
              <p className="text-gray-500 text-lg mb-2">{product.category}</p>
              {renderStars(product.rating)}
              <p className="text-3xl font-bold text-[#007bff] mb-6">${product.price}</p>
              <p className="text-gray-700 text-lg leading-relaxed mb-8">{product.description}</p>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => handleBuy(product)}
                  className="flex-1 bg-gradient-to-r from-[#5a8dee] to-[#007bff] hover:from-[#007bff] hover:to-[#5a8dee] text-white py-4 px-8 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Buy Now
                </button>
                <button
                  onClick={() => handleAddToCart(product)}
                  className="flex-1 bg-gradient-to-r from-[#5a8dee] to-[#007bff] hover:from-[#007bff] hover:to-[#5a8dee] text-white py-4 px-8 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <FaHeart className="text-lg" />
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Order Confirmation Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-3xl shadow-2xl max-w-md w-full mx-4 text-center">
            <h3 className="text-2xl font-bold text-[#0a1a2f] mb-6">Confirm Purchase</h3>
            <div className="mb-6">
              <p className="text-lg font-semibold text-[#0a1a2f] mb-2">{selectedProduct.title}</p>
              <p className="text-gray-600 mb-2"><strong>Price:</strong> ${selectedProduct.price}</p>
              <p className="text-gray-600 mb-4"><strong>Order Code:</strong> {orderCode}</p>
            </div>
            <div className="flex gap-4">
              <button
                onClick={handleConfirm}
                className="flex-1 bg-gradient-to-r from-[#5a8dee] to-[#007bff] hover:from-[#007bff] hover:to-[#5a8dee] text-white py-3 px-6 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Confirm
              </button>
              <button
                onClick={handleCancel}
                className="flex-1 bg-gradient-to-r from-[#966e72] to-[#c82333] hover:from-[#c82333] hover:to-[#dc3545] text-white py-3 px-6 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
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