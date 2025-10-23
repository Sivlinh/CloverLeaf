import React from "react";
import { useParams, Link } from "react-router-dom";
import products from "../data/products";

export default function ProductDetail() {
  const { id } = useParams();
  const product = products.find((p) => p.id === parseInt(id));

  if (!product) return <p className="text-center mt-10">Product not found.</p>;

  return (
    <div className="max-w-4xl mx-auto py-16 px-4">
      <Link to="/shop" className="px-8 py-3 bg-blue-600 text-white rounded-[25px] font-semibold shadow-md hover:bg-blue-400 transition">
        ← Back
      </Link>
      
      <div className="flex flex-col md:flex-row gap-8 items-center mt-6">
        <img src={product.images[0]} alt={product.title} className="w-80 h-80 object-contain rounded-xl shadow" />
        <div>
          <h2 className="text-3xl font-semibold mb-2">{product.title}</h2>
          <p className="text-gray-600 mb-4">${product.price}</p>
          <p className="text-gray-700 mb-6">{product.description}</p>
          <button className="px-6 py-3 bg-blue-600 text-white rounded-[25px] font-semibold hover:bg-blue-500 transition">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
