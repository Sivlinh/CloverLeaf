import React from "react";
import { motion } from "framer-motion";

const products = [
  { id: 1, name: "Gentle Cleansing Balm", price: "$42", image: "/public/sunscreen.png" },
  { id: 2, name: "Hydrating Face Serum", price: "$16", image: "/public/sunscreen.png" },
  { id: 3, name: "Nourishing Night Cream", price: "$28", image: "/public/sunscreen.png" },
  { id: 4, name: "Brightening Clay Mask", price: "$18", image: "/public/sunscreen.png" },
  { id: 5, name: "Vitamin C Toner", price: "$29", image: "/public/sunscreen.png" },
  { id: 6, name: "Aloe Vera Gel", price: "$20", image: "/public/sunscreen.png" },
  { id: 7, name: "Relief Sun Aqua-Fresh", price: "$16", image: "/public/sunscreen.png" },
  { id: 8, name: "Anua Cleansing Oil", price: "$19", image: "/public/sunscreen.png" },
  
];

export default function ProductSection() {
  return (
    <section id="shop" className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        {/* Title */}
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

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
              className="group border rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              {/* Image */}
              <div className="overflow-hidden relative">
                <motion.img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-60 object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <motion.div
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 group-hover:opacity-100"
                >
                  
                </motion.div>
              </div>

              {/* Info */}
              <div className="p-4 text-center">
                <h3 className="font-semibold text-lg text-gray-800">{product.name}</h3>
                <p className="text-gray-600 mt-1">{product.price}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Button */}
        <div className="text-center mt-12">
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="/shop"
            className="px-8 py-3 bg-gray-900 text-white rounded-lg font-semibold shadow-md hover:bg-gray-800 transition"
          >
            View All Products
          </motion.a>
        </div>
      </div>
    </section>
  );
}