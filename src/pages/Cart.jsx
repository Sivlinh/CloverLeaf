import React, { useEffect, useState } from "react";
import { FaTrashAlt } from "react-icons/fa";

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    // Add quantity = 1 by default
    const cartWithQuantity = cart.map((item) => ({ ...item, quantity: item.quantity || 1 }));
    setCartItems(cartWithQuantity);
  }, []);

  const handleQuantityChange = (id, amount) => {
    const updated = cartItems.map((item) =>
      item.id === id
        ? { ...item, quantity: Math.max(1, item.quantity + amount) }
        : item
    );
    setCartItems(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  const handleSelect = (id) => {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const handleRemove = (id) => {
    const updated = cartItems.filter((item) => item.id !== id);
    setCartItems(updated);
    setSelectedItems(selectedItems.filter((x) => x !== id));
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  const selectedProducts = cartItems.filter((item) => selectedItems.includes(item.id));
  const totalAmount = selectedProducts.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleCheckout = () => {
    if (selectedItems.length === 0) {
      alert("Please select at least one product to buy.");
      return;
    }
    alert(`✅ Purchase Successful! Total: $${totalAmount.toFixed(2)}`);
    const remaining = cartItems.filter((item) => !selectedItems.includes(item.id));
    setCartItems(remaining);
    setSelectedItems([]);
    localStorage.setItem("cart", JSON.stringify(remaining));
  };

  return (
    <div className="min-h-screen bg-[#f9fcff] p-8">
      <h1 className="text-2xl font-semibold mb-8 text-[#1e385b]">🛒 Your Cart</h1>

      {cartItems.length === 0 ? (
        <p className="text-gray-500">Your cart is empty.</p>
      ) : (
        <>
          <div className="space-y-4 ">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className={`flex items-center justify-between bg-white shadow-md rounded-2xl p-4 hover:shadow-lg transition-all ${
                  selectedItems.includes(item.id) ? "ring-2 ring-[#102b5d]" : ""
                }`}
              >
                {/* Checkbox */}
                <input
                  type="checkbox"
                  checked={selectedItems.includes(item.id)}
                  onChange={() => handleSelect(item.id)}
                  className="w-5 h-5  accent-[#4a8cd2] cursor-pointer mr-4"
                />

                {/* Product Info */}
                <div className="flex items-center gap-4 w-full">
                  <img
                    src={item.images?.[0]}
                    alt={item.title}
                    className="w-20 h-20 object-contain rounded-xl bg-[#f5f7fa]"
                  />
                  <div className="flex-1">
                    <h3 className="font-medium text-[#0a1a2f] text-lg">{item.title}</h3>
                    <p className="text-sm text-gray-500">{item.category}</p>
                    <p className="text-[#007bff] font-bold">${item.price}</p>
                  </div>

                  {/* Quantity Control */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleQuantityChange(item.id, -1)}
                      className="bg-gray-200 hover:bg-gray-300 px-2 rounded-full"
                    >
                      -
                    </button>
                    <span className="w-6 text-center">{item.quantity}</span>
                    <button
                      onClick={() => handleQuantityChange(item.id, 1)}
                      className="bg-gray-200 hover:bg-gray-300 px-2 rounded-full"
                    >
                      +
                    </button>
                  </div>

                  {/* Remove Button */}
                  <FaTrashAlt
                    onClick={() => handleRemove(item.id)}
                    className="text-gray-400 hover:text-red-500 cursor-pointer ml-4"
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Total Section */}
          <div className="mt-10 bg-white shadow-lg rounded-2xl p-6 flex justify-between items-center">
            <p className="text-lg font-semibold text-[#0a1a2f]">
              Total ({selectedItems.length} items):{" "}
              <span className="text-[#007bff]">${totalAmount.toFixed(2)}</span>
            </p>
            <button
              onClick={handleCheckout}
              className="bg-gradient-to-r from-[#5a8dee] to-[#007bff]  hover:to-[#5a8dee] text-white px-8 py-2.5 rounded-full font-medium shadow-md hover:shadow-lg transition-all"
            >
              Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
}
