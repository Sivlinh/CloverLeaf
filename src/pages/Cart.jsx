import React, { useEffect, useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
export default function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState("info");

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
    // Dispatch custom event to update cart count in Nav
    window.dispatchEvent(new Event("cartUpdated"));
  };

  // When quantity changes, ensure the item is selected so totals update
  useEffect(() => {
    // if there are no selected items, nothing to do
    if (!cartItems || cartItems.length === 0) return;
    // make sure selectedItems references valid ids only
    setSelectedItems((prev) => prev.filter((id) => cartItems.some((i) => i.id === id)));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cartItems]);

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
    // Dispatch custom event to update cart count in Nav
    window.dispatchEvent(new Event("cartUpdated"));
  };

  const selectedProducts = cartItems.filter((item) => selectedItems.includes(item.id));
  const totalAmount = selectedProducts.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleCheckout = () => {
    if (selectedItems.length === 0) {
      setMessage("Please select at least one product to buy.");
      setMessageType("error");
      return;
    }
    setMessage(`✅ Purchase Successful! Total: $${totalAmount.toFixed(3)}`);
    setMessageType("success");
    const remaining = cartItems.filter((item) => !selectedItems.includes(item.id));
    setCartItems(remaining);
    setSelectedItems([]);
    localStorage.setItem("cart", JSON.stringify(remaining));
    // Dispatch custom event to update cart count in Nav
    window.dispatchEvent(new Event("cartUpdated"));
  };

  // auto-clear message after a short timeout
  useEffect(() => {
    if (!message) return;
    const t = setTimeout(() => setMessage(null), 4000);
    return () => clearTimeout(t);
  }, [message]);

  // dynamically adjust checkout bar bottom offset so it doesn't overlap the footer
  const [bottomOffset, setBottomOffset] = useState(16);
  useEffect(() => {
    const footer = () => document.querySelector('footer');

    function updateOffset() {
      const f = footer();
      if (!f) {
        setBottomOffset(16);
        return;
      }
      const rect = f.getBoundingClientRect();
      const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
      // if footer's top is within the viewport, raise the bar above it
      if (rect.top < viewportHeight) {
        const overlap = viewportHeight - rect.top;
        // add a small gap (16px)
        setBottomOffset(overlap + 16);
      } else {
        setBottomOffset(16);
      }
    }

    // update on scroll and resize
    window.addEventListener('scroll', updateOffset, { passive: true });
    window.addEventListener('resize', updateOffset);

    // observe footer size/position changes
    let ro;
    const fEl = footer();
    if (fEl && window.ResizeObserver) {
      ro = new ResizeObserver(updateOffset);
      ro.observe(fEl);
    }

    // initial run
    updateOffset();

    return () => {
      window.removeEventListener('scroll', updateOffset);
      window.removeEventListener('resize', updateOffset);
      if (ro && fEl) ro.unobserve(fEl);
    };
  }, []);

  return (
  <div className="min-h-screen bg-[#fffaf5] p-8 pb-64">
      {/* Inline message banner (replaces alert()) */}
      {message && (
        <div
          className={`max-w-4xl mx-auto mb-6 p-4 rounded-lg flex items-start justify-between border ${
            messageType === "success"
              ? "bg-green-50 border-green-200 text-green-800"
              : messageType === "error"
              ? "bg-red-50 border-red-200 text-red-800"
              : "bg-blue-50 border-blue-200 text-blue-800"
          }`}
        >
          <div className="flex-1 pr-4">{message}</div>
          <button
            onClick={() => setMessage(null)}
            className="ml-4 text-sm font-medium underline opacity-80"
          >
            Dismiss
          </button>
        </div>
      )}
      <h1 className="text-2xl font-semibold mb-8 text-[#1e385b]"> Your Cart</h1>

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
                    <p className="text-sm text-gray-500">Subtotal: <span className="text-[#007bff] font-semibold">${(item.price * item.quantity).toFixed(2)}</span></p>
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

          {/* Total Section - fixed to bottom */}
          <div className="fixed left-0 right-0 flex justify-center pointer-events-none" style={{ bottom: bottomOffset }}>
            <div className="w-full max-w-4xl mx-auto bg-white shadow-lg rounded-2xl p-4 md:p-6 flex justify-between items-center pointer-events-auto">
              <p className="text-lg font-semibold text-[#0a1a2f]">
                Total ({selectedItems.length} items): <span className="text-[#007bff]">${totalAmount.toFixed(2)}</span>
              </p>

              <button
                onClick={handleCheckout}
                className="bg-gradient-to-r from-[#035a19] to-[#0b751b]  hover:to-[#166a25] text-white px-6 md:px-8 py-2.5 rounded-full font-medium shadow-md hover:shadow-lg transition-all"
              >
                Checkout
              </button>
            </div>
          </div>
        </>
      )}
      
       <div className=" max-w-4xl mx-auto py-16 px-4">
          <Link to="/shop" className="px-8 py-3 bg-green-900 text-white rounded-lg font-semibold shadow-md hover:bg-green-800 transition">
           ← Back to Shop
         </Link>
         </div>
    </div>
  );
}
