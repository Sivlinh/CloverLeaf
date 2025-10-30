import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import products from "../data/products";

const homeProducts = [
  { id: 1, name: "Anua Deep Cleansing", price: "$7.0", image: "/Cleanser/Anua-removebg-preview (1).png" },
  { id: 11, name: "Serum Skin 1004", price: "$12.99", image: "/seroum/1004.png" },
  { id: 12, name: "Anua Serum", price: "$13.5", image: "/seroum/anua.png" },
  { id: 30, name: "Beauty of Joseon", price: "$13.5", image: "/Face mask/beauty.png" },
];

const slides = [
  {
    title: "Top 10 Trending Picks",
    text: "Discover our most loved skincare products that redefine self-care and confidence.",
    button: "Shop Top Picks",
    image: "/hero3.png",
    category: "Top",
  },
  {
    title: "Glow & Glam Make-Up",
    text: "Express yourself with our vibrant make-up essentials — bold, soft, or natural, your choice.",
    button: "Shop Make-Up",
    image: "/makeupface.png",
    category: "Make Up",
  },
  {
    title: "HydraSkin Moisture",
    text: "Unlock deep hydration with silky moisturizers made to nourish, protect, and glow from within.",
    button: "Shop Moisturizers",
    image: "/hero5.png",
    category: "Moisturizer",
  },
];

export default function Home() {
  const [index, setIndex] = useState(0);
  const [reviewsData, setReviewsData] = useState({});
  const navigate = useNavigate();

  const prevSlide = () => setIndex((prev) => (prev - 1 + slides.length) % slides.length);
  const nextSlide = () => setIndex((prev) => (prev + 1) % slides.length);

  useEffect(() => {
    const reviews = {};
    homeProducts.forEach((p) => {
      const stored = localStorage.getItem(`reviews_${p.id}`);
      if (stored) reviews[p.id] = JSON.parse(stored);
    });
    setReviewsData(reviews);
  }, []);

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating - fullStars >= 0.5;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

    return (
      <div className="flex justify-center items-center mb-1">
        {[...Array(fullStars)].map((_, i) => (
          <FaStar key={`f-${i}`} className="text-yellow-400 text-sm" />
        ))}
        {halfStar && <FaStar className="text-yellow-300 text-sm opacity-70" />}
        {[...Array(emptyStars)].map((_, i) => (
          <FaStar key={`e-${i}`} className="text-gray-300 text-sm" />
        ))}
        <span className="text-gray-500 text-xs ml-1">({rating.toFixed(1)})</span>
      </div>
    );
  };

  return (
    <div className="w-full mt-16">
      {/* Hero Section */}
      <div className="relative w-full h-[75vh] md:h-[90vh] overflow-hidden">
        {slides.map((slide, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: i === index ? 1 : 0 }}
            transition={{ duration: 0.8 }}
            className={`absolute inset-0 flex flex-col md:flex-row items-center justify-between px-8 md:px-16 ${
              i === index ? "z-20" : "z-10"
            }`}
          >
            {/* Text */}
            <div className="flex flex-col justify-center items-center md:items-start text-center md:text-left w-full md:w-1/2 space-y-5">
              <h2 className="text-3xl md:text-5xl font-serif font-bold">{slide.title}</h2>
              <p className="text-base md:text-lg text-gray-700">{slide.text}</p>
              <button
                onClick={() => navigate(`/shop?category=${encodeURIComponent(slide.category)}`)}
                className="bg-green-900 hover:bg-green-800 text-white py-2 px-6 rounded-full font-medium shadow-md hover:shadow-lg transition-all duration-300"
              >
                {slide.button}
              </button>
            </div>

            {/* Image */}
            <img
              src={slide.image}
              alt={slide.title}
              loading="lazy"
              className="w-full md:w-[45%] h-[250px] md:h-[80vh] object-cover rounded-xl shadow-sm"
            />
          </motion.div>
        ))}

        {/* Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-3 md:left-6 top-1/2 -translate-y-1/2 text-3xl text-white bg-black/40 px-3 py-1 rounded-full hover:bg-black/70 z-30"
        >
          ‹
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 text-3xl text-white bg-black/40 px-3 py-1 rounded-full hover:bg-black/70 z-30"
        >
          ›
        </button>

        {/* Dots */}
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex space-x-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`w-3 h-3 rounded-full transition-all ${
                i === index ? "bg-white" : "bg-gray-500"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Bestsellers */}
      <section className="py-16 bg-[#fffaf5]">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-3xl font-serif font-bold text-gray-800 mb-2"
          >
            Bestselling Favorites
          </motion.h2>
          <p className="text-gray-600 mb-10">
            Our most-loved products, trusted by thousands for their transformative results.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {homeProducts.map((p, i) => {
              const reviews = reviewsData[p.id] || [];
              const avg =
                reviews.length > 0
                  ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
                  : products.find((x) => x.id === p.id)?.rating || 4.0;

              return (
                <Link to={`/product/${p.id}`} key={p.id}>
                  <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1, duration: 0.5 }}
                    viewport={{ once: true }}
                    className="group border rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                  >
                    <img
                      src={p.image}
                      alt={p.name}
                      loading="lazy"
                      className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="p-4 text-center">
                      <h3 className="font-semibold text-lg text-gray-800">{p.name}</h3>
                      {renderStars(avg)}
                      <p className="text-gray-600 mt-1">{p.price}</p>
                    </div>
                  </motion.div>
                </Link>
              );
            })}
          </div>

          <div className="mt-12">
            <Link
              to="/shop"
              className="bg-green-900 hover:bg-green-800 text-white py-2 px-6 rounded-full font-semibold shadow-md hover:shadow-lg transition-all duration-300"
            >
              View All Products
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
