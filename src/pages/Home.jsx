import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const products = [
  { id: 1, name: "Anua Deep Cleansing", price: "$7.0", image: "/Cleanser/Anua-removebg-preview (1).png" },
  { id: 11, name: "Serum Skin 1004", price: "$12.99", image: "/seroum/1004.png" },
  { id: 12, name: "Anua Serum", price: "$13.5", image: "/seroum/anua.png" },
  { id: 30, name: "Beauty of Joseon ", price: "$13.5", image: "/Face mask/beauty.png" },
  { id: 29, name: "Biodance Vitamin Mask", price: "$12.0",   image: ["/Face mask/biodance.png"] },
  { id: 23, name: "Light Daily Cream", price: "$11.5", image: "/Moisturizer/3.png" },
  { id: 18, name: "IsnTree Sunscreen", price: "$9.5", image: "/sunscreen/isntree.png" },
  { id: 16, name: "Skin 1004 Sunscreen", price: "$12.5", image: "/sunscreen/1004.png" },
];

export default function Home() {
  return (
    <section id="shop" className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-3xl font-bold text-center mb-8 text-gray-800"
        >
          <h1 className="font-serif">Bestselling Favorites</h1>
          <h3 className="font-extralight text-lg">Our most-loved products, trusted by thousands for their transformative results</h3>
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
            className="px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold shadow-md hover:bg-blue-400 transition"
          >
            View All Products
          </motion.a>
        </div>
      </div>
    </section>
  );
}
