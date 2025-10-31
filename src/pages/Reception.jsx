import React from "react";
import { Link } from "react-router-dom";

export default function Reception() {
  return (
    <div className="min-h-screen bg-[#fffaf5] flex flex-col items-center justify-center p-8 animate-fade-in">
      <div className="bg-white shadow-lg rounded-2xl p-8 max-w-md text-center">
        <h1 className="text-3xl font-bold text-[#1e385b] mb-4">Payment Successful!</h1>
        <p className="text-gray-600 mb-6">
          Thank you for your purchase. Your order has been processed successfully. Please waiting for delivery.
        </p>
        <div className="space-y-4">
          <Link
            to="/shop"
            className="block bg-green-900 hover:bg-green-800 text-white px-4 py-2 rounded-full font-medium shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
          >
            Continue Shopping
          </Link>
          <Link
            to="/profile"
            className="block bg-gray-600 hover:bg-gray-500 text-white px-4 py-2 rounded-full font-medium shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            View Order History
          </Link>
        </div>
      </div>
    </div>
  );
}