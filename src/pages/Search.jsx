import React, { useState } from "react";
import { FaStar, FaSearch } from "react-icons/fa";

export default function Shop() {
  const [searchTerm, setSearchTerm] = useState("");
  const [products] = useState([
    { id: 1, title: "Heartleaf Deep Cleansing Foam", price: 15, category: "Cleanser", rating: 4.5, image: "/images/cleanser1.png" },
    { id: 2, title: "Niacinamide Bright Serum", price: 25, category: "Serum", rating: 4.8, image: "/images/serum1.png" },
    { id: 3, title: "Moisture Shield Sunscreen", price: 18, category: "Sunscreen", rating: 4.6, image: "/images/sunscreen1.png" },
    { id: 4, title: "Calming Toner", price: 20, category: "Toner", rating: 4.7, image: "/images/toner1.png" },
  ]);

  const [filteredProducts, setFilteredProducts] = useState(products);

  const handleSearch = (e) => {
    e.preventDefault();
    const results = products.filter((p) =>
      p.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(results);
  };

  return (
    <div className="bg-[#fffaf5] min-h-screen py-12 px-6 md:px-12">
      <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">Our Products</h1>

      {/* 🔍 Search Bar */}
      <form
        onSubmit={handleSearch}
        className="flex justify-center mb-10 max-w-lg mx-auto"
      >
        <input
          type="text"
          placeholder="Search by product name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-l-full focus:outline-none focus:ring-2 focus:ring-pink-400"
        />
        <button
          type="submit"
          className="bg-pink-500 hover:bg-pink-600 text-white px-5 py-2 rounded-r-full flex items-center justify-center transition-all"
        >
          <FaSearch />
        </button>
      </form>

      {/* 🛍️ Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden"
            >
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-64 object-cover"
              />
              <div className="p-4 text-center">
                <h2 className="font-semibold text-gray-800 text-lg mb-2">
                  {product.title}
                </h2>
                <div className="flex justify-center items-center gap-1 text-yellow-500 mb-2">
                  <FaStar /> <span>{product.rating}</span>
                </div>
                <p className="text-pink-600 font-bold text-xl mb-4">
                  ${product.price.toFixed(2)}
                </p>
                <button className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-full transition-all">
                  Buy Now
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 text-lg col-span-full">
            No products found 
          </p>
        )}
      </div>
    </div>
  );
}
