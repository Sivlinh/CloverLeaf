import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  // 💖 Each slide has its own cool theme & category
  const slide1 = {
    title: "Top 10 Beauty Picks",
    text: "Discover our most loved skincare products that redefine self-care and confidence.",
    button: "Shop Top Picks",
    image: "/hero3.png",
    category: "Top 10",
  };

  const slide2 = {
    title: "Glow & Glam Make-Up",
    text: "Express yourself with our vibrant collection of make-up essentials — bold, soft, or natural, your choice.",
    button: "Shop Make-Up",
    image: "/lip.png",
    category: "Make Up",
  };

  const slide3 = {
    title: "HydraSkin Moisture",
    text: "Unlock deep hydration with silky moisturizers made to nourish, protect, and glow from within.",
    button: "Shop Moisturizers",
    image: "/hero5.png",
    category: "Moisturizer",
  };

  // 🌿 Combine slides
  const slides = [slide1, slide2, slide3];

  const [index, setIndex] = useState(0);

  // Auto-slide every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  // 🔗 Navigate to Shop with category filter
  const goToCategory = (category) => {
    navigate(`/shop?category=${encodeURIComponent(category)}`);
  };

  return (
    <div className="relative w-full h-[80vh] md:h-[90vh] overflow-hidden bg-black text-white">
      {slides.map((slide, i) => (
        <div
          key={i}
          className={`absolute inset-0 flex flex-col md:flex-row transition-opacity duration-700 ${
            i === index ? "opacity-100" : "opacity-0"
          }`}
        >
          {/* Left side - text */}
          <div className="flex flex-col justify-center w-full md:w-1/2 px-8 md:px-16 py-10 md:py-0 text-center md:text-left">
            <h2 className="text-4xl md:text-6xl font-bold mb-4 tracking-wide drop-shadow-lg">
              {slide.title}
            </h2>
            <p className="text-lg md:text-xl italic opacity-90 mb-6">
              {slide.text}
            </p>
            <button
              onClick={() => goToCategory(slide.category)}
              className="bg-white text-black px-6 py-3 font-semibold rounded-md hover:bg-gray-200 hover:scale-105 transition-transform duration-300 w-fit mx-auto md:mx-0"
            >
              {slide.button}
            </button>
          </div>

          {/* Right side - image */}
          <div className="w-full md:w-1/2">
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-[300px] md:h-full object-cover"
            />
          </div>
        </div>
      ))}

      {/* Navigation arrows */}
      <button
        onClick={() => setIndex((index - 1 + slides.length) % slides.length)}
        className="absolute left-3 md:left-5 top-1/2 -translate-y-1/2 text-3xl md:text-4xl text-white bg-black/40 px-3 py-1 rounded-full hover:bg-black/70"
      >
        ‹
      </button>
      <button
        onClick={() => setIndex((index + 1) % slides.length)}
        className="absolute right-3 md:right-5 top-1/2 -translate-y-1/2 text-3xl md:text-4xl text-white bg-black/40 px-3 py-1 rounded-full hover:bg-black/70"
      >
        ›
      </button>

      {/* Dots indicator */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex space-x-3">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`w-3 h-3 rounded-full ${
              i === index ? "bg-white" : "bg-gray-500"
            }`}
          ></button>
        ))}
      </div>
    </div>
  );
}
