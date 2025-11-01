import React, { useState, useEffect } from "react";
import { FaStar, FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import products from "../data/products";

export default function Search() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("name");

  // Get unique categories
  const categories = ["All", ...new Set(products.flatMap(p =>
    Array.isArray(p.category) ? p.category : [p.category]
  ))];

  useEffect(() => {
    let results = products.filter((p) => {
      const matchesSearch = p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           p.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === "All" ||
                             (Array.isArray(p.category) ? p.category.includes(selectedCategory) : p.category === selectedCategory);
      return matchesSearch && matchesCategory;
    });

    // Sort results
    results.sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        case "rating":
          return b.rating - a.rating;
        default: // name
          return a.title.localeCompare(b.title);
      }
    });

    setFilteredProducts(results);
  }, [searchTerm, selectedCategory, sortBy]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="bg-[#fffaf5] min-h-screen py-12 px-6 md:px-12">
      <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">Search Products</h1>

      {/* 🔍 Search and Filter Section */}
      <div className="max-w-6xl mx-auto mb-10">
        {/* Search Bar */}
        <div className="flex justify-center mb-6">
          <div className="flex w-full max-w-lg">
            <input
              type="text"
              placeholder="Search by product name or description..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-l-full focus:outline-none focus:ring-2 focus:ring-blue-400 text-lg"
            />
            <button
              className="bg-blue-500 hover:bg-blue-400 text-white px-6 py-3 rounded-r-full flex items-center justify-center transition-all"
            >
              <FaSearch className="text-lg" />
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-4 mb-6">
          <div className="flex items-center gap-2">
            <label className="text-gray-700 font-medium">Category:</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2">
            <label className="text-gray-700 font-medium">Sort by:</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
            >
              <option value="name">Name</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Rating</option>
            </select>
          </div>
        </div>

        {/* Results Count */}
        <div className="text-center text-gray-600">
          {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''} found
        </div>
      </div>

      {/* 🛍️ Product Grid */}
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden"
              >
                <img
                  src={product.images[0]}
                  alt={product.title}
                  className="w-full h-64 object-cover"
                />
                <div className="p-4">
                  <h2 className="font-semibold text-gray-800 text-lg mb-2 line-clamp-2">
                    {product.title}
                  </h2>
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center gap-1 text-yellow-500">
                      <FaStar /> <span className="text-sm">{product.rating}</span>
                    </div>
                    <span className="text-xs bg-gray-100 px-2 py-1 rounded-full text-gray-600">
                      {Array.isArray(product.category) ? product.category[0] : product.category}
                    </span>
                  </div>
                  <p className="text-blue-600 font-bold text-xl mb-3">
                    ${product.price.toFixed(2)}
                  </p>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {product.description}
                  </p>
                  <Link
                    to={`/product/${product.id}`}
                    className="w-full bg-green-900 hover:bg-green-800 text-white px-4 py-2 rounded-full transition-all text-center block"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <FaSearch className="mx-auto text-4xl text-gray-300 mb-4" />
              <p className="text-gray-500 text-lg">No products found matching your search</p>
              <p className="text-gray-400 text-sm">Try adjusting your search terms or filters</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
