import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";

const products = [
  { id: 1, name: "Anua Deep Cleansing", price: "$7.0", image: "/Cleanser/Anua-removebg-preview (1).png" },
  { id: 11, name: "Serum Skin 1004", price: "$12.99", image: "/seroum/1004.png" },
  { id: 12, name: "Anua Serum", price: "$13.5", image: "/seroum/anua.png" },
  { id: 30, name: "Beauty of Joseon", price: "$13.5", image: "/Face mask/beauty.png" },
];

// ✨ Updated slides (image-based + category links)
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
    image: "public/makeupface.png",
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
  const navigate = useNavigate();

  // ✅ Removed auto-slide (manual only)
  const prevSlide = () => {
    setIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const nextSlide = () => {
    setIndex((prev) => (prev + 1) % slides.length);
  };

  return (
    <div id="bodybg" className="w-full mt-16">
      {/* Hero Slider with Images */}
      <div  className="relative  shadow-sm  w-full h-[80vh] md:h-[90vh] overflow-hidden animate-fade-in">
        {slides.map((slide, i) => (
          <div
            key={i}
            className={`absolute inset-0 flex flex-col md:flex-row transition-opacity duration-700 ${
              i === index ? "opacity-100" : "opacity-0"
            }`}
          >
            {/* Left side - text */}
            <div className="flex flex-col justify-center w-full md:w-1/2 px-8 md:px-16 py-10 md:py-0 text-center md:text-left z-20">
              <h2 className="text-3xl md:text-5xl font-serif font-bold mb-4">{slide.title}</h2>
              <p className="text-base md:text-lg mb-6">{slide.text}</p>
             <button
 onClick={() => navigate(`/shop?category=${encodeURIComponent(slide.category)}`)}
 className="bg-green-900 hover:bg-green-800 text-white py-2 px-5 rounded-2xl font-medium shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 w-fit mx-auto md:mx-0 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
>
 {slide.button}
</button>

            </div>

            {/* Right side - image */}
            <div className="w-full md:w-[40%] h-[250px] md:h-[80vh] relative">
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0"></div>
            </div>
          </div>
        ))}

        {/* Navigation arrows (manual only) */}
        <button
          onClick={prevSlide}
          className="absolute left-3 md:left-5 top-1/2 -translate-y-1/2 text-3xl md:text-4xl text-white bg-black/40 px-3 py-1 rounded-full hover:bg-black/70 z-30"
        >
          ‹
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-3 md:right-5 top-1/2 -translate-y-1/2 text-3xl md:text-4xl text-white bg-black/40 px-3 py-1 rounded-full hover:bg-black/70 z-30"
        >
          ›
        </button>

        {/* Dots indicator */}
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex space-x-3 z-30">
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

      {/* Bestselling Products Section (unchanged) */}
      <section id="shop" className="py-16 bg-[#fffaf5] animate-slide-up">
        <div className="max-w-6xl mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-center mb-8 text-gray-800"
          >
            <h1 className="font-serif">Bestselling Favorites</h1>
            <h3 className="font-extralight text-lg">
              Our most-loved products, trusted by thousands for their transformative results
            </h3>
          </motion.h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {products.map((product, index) => (
              <Link to={`/product/${product.id}`} key={product.id}>
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  viewport={{ once: true }}
                  className="group border rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="overflow-hidden relative">
                    <motion.img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-100 object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  <div className="p-4 text-center">
                    <h3 className="font-semibold text-lg text-gray-800">{product.name}</h3>
                    <p className="text-gray-600 mt-1">{product.price}</p>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-12">
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="/shop"
               className="flex-1 w-full bg-green-900 hover:bg-green-800 text-white py-2 px-4 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            >
              View All Products
            </motion.a>
          </div>
        </div>
      </section>
    </div>
  );
}
