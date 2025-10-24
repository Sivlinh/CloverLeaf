import React, { useState, useEffect } from "react";


export default function Home() {
  const slides = [
    {
      title: "Soothe and Protect",
      text: "Discover our soothing creams that provide a protective barrier, locking in moisture and shielding your skin from environmental stressors.",
      button: "Explore Creams",
      image: "/hero3.png",
    },
    {
      title: "Connect withan Artisan   ",
      text: "Keep your skin hydrated all day long with our natural, plant-based moisturizers.",
      button: "Shop Now",
      image: "/lip.png",
    },
    {
      title: "Nourish Your Skin",
      text: "Experience the perfect blend of nature and science with our nourishing facial oils that hydrate and rejuvenate.",
      button: "Discover More",
      image: "/hero5.png",
    },
  ];

  const [index, setIndex] = useState(0);

  // Auto-slide every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

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
            <h2 className="text-3xl md:text-5xl font-semibold mb-4">
              {slide.title}
            </h2>
            <p className="text-base md:text-lg mb-6">{slide.text}</p>
            <button className="bg-white text-black px-6 py-3 font-semibold rounded-md hover:bg-gray-200 transition w-fit mx-auto md:mx-0">
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
