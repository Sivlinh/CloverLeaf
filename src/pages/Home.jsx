import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { TestimonialsSection } from "./TestimonialsSection";

const products = [
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
    image: "/image copy 3.png",
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
  const navigate = useNavigate();

  const prevSlide = () => {
    setIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const nextSlide = () => {
    setIndex((prev) => (prev + 1) % slides.length);
  };

  return (
    <div className="w-full mb-10 mt-16 bg-[#fffaf5]">

      {/* Hero Slider */}
      <div className="relative shadow-sm w-full h-[80vh] md:h-[90vh] overflow-hidden animate-fade-in">
        {slides.map((slide, i) => (
          <div
            key={i}
            className={`absolute inset-0 flex flex-col md:flex-row transition-opacity duration-700 ${
              i === index ? "opacity-100" : "opacity-0"
            }`}
          >
            <div className="flex flex-col justify-center w-full md:w-1/2 px-8 md:px-16 py-10 md:py-0 text-center md:text-left z-20">
              <h2 className="text-3xl md:text-5xl font-serif font-bold mb-4">{slide.title}</h2>
              <p className="text-base md:text-lg mb-6">{slide.text}</p>
              <button
                id="btn"
                onClick={() => navigate(`/shop?category=${encodeURIComponent(slide.category)}`)}
                className="bg-green-900 hover:bg-green-800 text-white py-2 px-5 rounded-2xl font-medium shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 w-fit mx-auto md:mx-0"
              >
                {slide.button}
              </button>
            </div>

            <div className="w-full md:w-[40%] h-[250px] md:h-[80vh] relative">
              <img src={slide.image} alt={slide.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0"></div>
            </div>
          </div>
        ))}

        {/* Arrows */}
        <button onClick={prevSlide} className="absolute left-5 top-1/2 -translate-y-1/2 text-4xl text-white bg-black/40 px-3 py-1 rounded-full hover:bg-black/70 z-30">‹</button>
        <button onClick={nextSlide} className="absolute right-5 top-1/2 -translate-y-1/2 text-4xl text-white bg-black/40 px-3 py-1 rounded-full hover:bg-black/70 z-30">›</button>

        {/* Dots */}
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex space-x-3 z-30">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`w-3 h-3 rounded-full ${i === index ? "bg-white" : "bg-gray-500"}`}
            />
          ))}
        </div>
      </div>

      {/* Gentle Care Section */}
      <section className="py-20 bg-[#fffaf5] mb-10">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-3xl font-bold text-center mb-8 text-[#3e2f24]"
        >
        <div>
          <h1 className="font-serif">Gentle care every day</h1>
          <h3 className="font-extralight text-lg">
            Our most-loved products, trusted by thousands for their transformative results
          </h3> </div>
        </motion.h2>

        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="col-span-1 rounded-3xl shadow-lg overflow-hidden relative hover:shadow-2xl transition-all duration-500"
            style={{
              backgroundImage: "url(/treeback.png)",
              backgroundSize: "cover",
              backgroundPosition: "center"
            }}
          >
            <div className="absolute inset-0 bg-white/80 backdrop-blur-sm"></div>

            <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-8 space-y-4">
              <h3 className="font-semibold text-2xl text-[#333]">Daily skincare made easy</h3>
              <p className="text-gray-700 text-sm">
                A collection of carefully selected products to support your skin every day.
              </p>
              <button
                onClick={() => navigate("/shop?category=Serum")}
                id="btn"
                className="px-6 py-3 bg-[#3e2f24] text-white rounded-full hover:bg-[#5b4334] transition-all duration-300"
              >
                Shop Now
              </button>
            </div>
          </motion.div>

          {/* Right grid */}
          <div className="col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* Serum */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              onClick={() => navigate("/shop?category=Serum")}
              className="bg-white rounded-3xl shadow-lg relative overflow-hidden group cursor-pointer"
            >
              <img src="/serum2.png" className="w-full h-[250px] object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute bottom-[20%] left-[20%] opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <p className="text-[#3e2f24] font-extralight text-lg underline">Serum</p>
              </div>
            </motion.div>

            {/* Moisturizer */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              onClick={() => navigate("/shop?category=Moisturizer")}
              className="bg-white rounded-3xl shadow-lg relative overflow-hidden group cursor-pointer"
            >
              <img src="/mos1.png" className="w-full h-[250px] object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute bottom-[20%] left-[20%] opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <p className="text-[#3e2f24] font-extralight text-lg underline">Moisturizer</p>
              </div>
            </motion.div>

            {/* Face Mask */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              onClick={() => navigate("/shop?category=Face Mask")}
              className="bg-white rounded-3xl shadow-lg relative overflow-hidden group md:col-span-2 cursor-pointer"
            >
              <img src="/bro.jpg" className="w-full h-[300px] object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute bottom-[20%] left-[20%] opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <p className="text-[#3e2f24] font-extralight text-lg underline">Face Mask</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Bestselling */}
      <section id="shop" className="py-20 bg-[#fffaf5]">
        <div className="max-w-6xl mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-center mb-8 text-[#3e2f24]"
          > <div>
            <h1 className="font-serif">Bestselling Favorites</h1>
            <h3 className="font-extralight text-lg">
              Our most-loved products, trusted by thousands
            </h3>
            </div>
          </motion.h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {products.map((product, index) => (
              <Link to={`/product/${product.id}`} key={product.id}>
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  viewport={{ once: true }}
                  className="group border rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-xl transition-all duration-300"
                >
                  <div className="overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-100 object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  <div className="p-4 text-center">
                    <h3 className="font-semibold text-lg">{product.name}</h3>
                    <p className="text-gray-600 mt-1">{product.price}</p>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <TestimonialsSection />
    </div>
  );
}
