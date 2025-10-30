import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { FaStar, FaShoppingCart, FaChevronLeft, FaChevronRight, FaUser } from "react-icons/fa";
import products from "../data/products";

export default function ProductDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const product = products.find((p) => p.id === parseInt(id));
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [orderCode, setOrderCode] = useState("");
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [reviews, setReviews] = useState([]);
    const [newReview, setNewReview] = useState({ rating: 5, comment: "" });
    const [user, setUser] = useState(null);

   // Load user and reviews
   useEffect(() => {
     const savedUser = localStorage.getItem("user");
     if (savedUser) setUser(JSON.parse(savedUser));

     const savedReviews = localStorage.getItem(`reviews_${id}`);
     if (savedReviews) setReviews(JSON.parse(savedReviews));
   }, [id]);

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
    if (!user) {
      // alert(`Please log in or sign up to purchase this product.`);
      navigate("/profile");
      return;
    }
    setSelectedProduct(item);
    setOrderCode(generateOrderCode());
  };

  const handleConfirm = () => {
    if (!user) {
      // alert("Please log in or sign up to confirm your purchase.");
      navigate("/profile");
      return;
    }
    // alert(`✅ Order Confirmed!\nProduct: ${selectedProduct.title}\nPrice: $${selectedProduct.price}\nOrder Code: ${orderCode}`);
    setSelectedProduct(null);
  };

  const handleCancel = () => {
    setSelectedProduct(null);
  };

  // Handle review submission
  const handleSubmitReview = (e) => {
    e.preventDefault();
    if (!user) {
      // alert("Please log in to submit a review.");
      return;
    }
    if (!newReview.comment.trim()) return;

    const review = {
      id: Date.now(),
      userId: user.name,
      rating: newReview.rating,
      comment: newReview.comment,
      date: new Date().toISOString(),
    };

    const updatedReviews = [...reviews, review];
    setReviews(updatedReviews);
    localStorage.setItem(`reviews_${id}`, JSON.stringify(updatedReviews));
    setNewReview({ rating: 5, comment: "" });

    // Update product rating
    updateProductRating(updatedReviews);
  };

  // Update product rating based on reviews
  const updateProductRating = (reviewsList) => {
    if (reviewsList.length === 0) return;
    const avgRating = reviewsList.reduce((sum, r) => sum + r.rating, 0) / reviewsList.length;
    // For demo purposes, we'll update the local product rating display
    // In a real app, this would persist to a database
    console.log(`Updated rating for product ${id}: ${avgRating.toFixed(1)}`);
  };

  const nextImage = () => {
    if (product && product.images && product.images.length > 1) {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === product.images.length - 1 ? 0 : prevIndex + 1
      );
    }
  };

  const prevImage = () => {
    if (product && product.images && product.images.length > 1) {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === 0 ? product.images.length - 1 : prevIndex - 1
      );
    }
  };

  // ⭐ Function to render stars
  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating - fullStars >= 0.5;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

    return (
      <div className="flex bg-justify-center items-center mb-4">
        {[...Array(fullStars)].map((_, i) => (
          <FaStar key={`full-${i}`} className="text-yellow-400 text-lg" />
        ))}
        {halfStar && <FaStar className="text-yellow-300 text-lg opacity-70" />}
        {[...Array(emptyStars)].map((_, i) => (
          <FaStar key={`empty-${i}`} className="text-gray-300 text-lg" />
        ))}
        <span className="text-gray-500 text-sm ml-2">
          ({rating.toFixed(1)})
        </span>
      </div>
    );
  };

  if (!product) return <p className="text-center mt-10">Product not found.</p>;

  return (
    <div id="bodybg" className="min-h-screen bg-[#fffaf5] py-16 px-4 animate-fade-in">
      <div className="max-w-6xl mx-auto">
        <Link
          to="/shop"
          className="inline-flex items-center px-4 py-2 flex-1  text-black rounded-full font-semibold shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300 mb-8 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
        >
          ← Go to Shop
        </Link>

        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          <div className="flex flex-col lg:flex-row">
            {/* Product Image */}
            <div className="lg:w-1/2 p-8 bg-gradient-to-br from-[#f9fcff] to-[#eef5ff] flex items-center justify-center relative">
              <img
                src={product.images[currentImageIndex]}
                alt={product.title}
                className="w-full max-w-md h-96 object-contain rounded-2xl shadow-lg"
                onError={(e) => {
                  console.error('Image failed to load:', e.target.src);
                  e.target.src = '/placeholder.png'; // Fallback image
                }}
              />
              {product.images && product.images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-70 hover:bg-opacity-100 rounded-full p-2 shadow-lg transition-all duration-300"
                  >
                    <FaChevronLeft className="text-gray-700" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-70 hover:bg-opacity-100 rounded-full p-2 shadow-lg transition-all duration-300"
                  >
                    <FaChevronRight className="text-gray-700" />
                  </button>
                </>
              )}
            </div>

            {/* Product Details */}
            <div className="lg:w-1/2 p-8 flex flex-col justify-center">
              <h2 className="text-4xl font-bold text-[#0a1a2f] mb-4">
                {product.title}
              </h2>
              <p className="text-gray-500 text-lg mb-2">{product.category}</p>
              {renderStars(product.rating)}
              <p className="text-3xl font-bold text-[#007bff] mb-6">
                ${product.price}
              </p>
              <p className="text-gray-700 text-lg leading-relaxed mb-8">
                {product.description}
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => handleBuy(product)}
                  className="flex-1 w-full bg-green-900 hover:bg-green-800 text-white py-2 px-2 rounded-full font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                >
                  Buy Now
                </button>
                <button
                  onClick={() => handleAddToCart(product)}
                  className="flex-1 w-full bg-green-900 hover:bg-green-800 text-white py-2 px-2 rounded-full font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                >
                  <FaShoppingCart className="text-lg" />
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 mt-8">
          <h3 className="text-2xl font-bold text-[#0a1a2f] mb-6">Customer Reviews</h3>

          {/* Review Submission Form */}
          {user ? (
            <form onSubmit={handleSubmitReview} className="mb-8 p-6 bg-gray-50 rounded-2xl">
              <h4 className="text-lg font-semibold mb-4">Write a Review</h4>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Rating</label>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <FaStar
                      key={star}
                      className={`cursor-pointer text-lg ${
                        star <= newReview.rating ? "text-yellow-400" : "text-gray-300"
                      }`}
                      onClick={() => setNewReview({ ...newReview, rating: star })}
                    />
                  ))}
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Comment</label>
                <textarea
                  value={newReview.comment}
                  onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                  className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  rows={4}
                  placeholder="Share your thoughts about this product..."
                  required
                />
              </div>
              <button
                type="submit"
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-full font-medium shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Submit Review
              </button>
            </form>
          ) : (
            <div className="mb-8 p-6 bg-gray-50 rounded-2xl text-center">
              <p className="text-gray-600">Please <Link to="/profile" className="text-green-600 hover:underline">log in</Link> to write a review.</p>
            </div>
          )}

          {/* Reviews List */}
          <div className="space-y-6">
            {reviews.length > 0 ? (
              reviews.map((review) => (
                <div key={review.id} className="border-b pb-6 last:border-b-0">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                      <FaUser className="text-gray-500" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-semibold text-gray-800">{review.userId}</span>
                        <div className="flex">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <FaStar
                              key={star}
                              className={`text-sm ${
                                star <= review.rating ? "text-yellow-400" : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-xs text-gray-500">
                          {new Date(review.date).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-gray-700">{review.comment}</p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-12">
                <FaStar className="mx-auto text-4xl text-gray-300 mb-4" />
                <p className="text-gray-500">No reviews yet. Be the first to review this product!</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Order Confirmation Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-3xl shadow-2xl max-w-md w-full mx-4 text-center">
            <h3 className="text-2xl font-bold text-[#0a1a2f] mb-6">
              Confirm Purchase
            </h3>
            <div className="mb-6">
              <p className="text-lg font-semibold text-[#0a1a2f] mb-2">
                {selectedProduct.title}
              </p>
              <p className="text-gray-600 mb-2">
                <strong>Price:</strong> ${selectedProduct.price}
              </p>
              <p className="text-gray-600 mb-4">
                <strong>Order Code:</strong> {orderCode}
              </p>
            </div>
            <div className="flex gap-4">
              <button
                id="btn"
                onClick={handleConfirm}
                className="flex-1 bg-green-900 hover:bg-green-800 text-white py-3 px-6 rounded-full font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
              >
                Confirm
              </button>
              <button
                onClick={handleCancel}
                className="flex-1 bg-gray-500 hover:bg-gray-400 text-white py-3 px-6 rounded-full font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
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

