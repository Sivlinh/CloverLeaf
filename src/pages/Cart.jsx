import React, { useEffect, useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

export default function Cart() {
   const navigate = useNavigate();
   const [cartItems, setCartItems] = useState([]);
   const [selectedItems, setSelectedItems] = useState([]);
   const [message, setMessage] = useState(null);
   const [messageType, setMessageType] = useState("info");
   const [bottomOffset, setBottomOffset] = useState(16);
   const [user, setUser] = useState(null);

  // FIXED: set a constant height for the checkout bar so we can pad the page
  const CHECKOUT_BAR_HEIGHT = 88; // px - adjust if you change the bar size

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) setUser(JSON.parse(savedUser));

    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const cartWithQuantity = cart.map((item) => ({ ...item, quantity: item.quantity || 1 }));
    setCartItems(cartWithQuantity);
  }, []);

  const handleQuantityChange = (id, amount) => {
    const updated = cartItems.map((item) =>
      item.id === id ? { ...item, quantity: Math.max(1, item.quantity + amount) } : item
    );
    setCartItems(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
    window.dispatchEvent(new Event("cartUpdated"));
  };

  useEffect(() => {
    if (!cartItems || cartItems.length === 0) return;
    setSelectedItems((prev) => prev.filter((id) => cartItems.some((i) => i.id === id)));
  }, [cartItems]);

  const handleSelect = (id) => {
    setSelectedItems((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  };

  const handleRemove = (id) => {
    const updated = cartItems.filter((item) => item.id !== id);
    setCartItems(updated);
    setSelectedItems((prev) => prev.filter((x) => x !== id));
    localStorage.setItem("cart", JSON.stringify(updated));
    window.dispatchEvent(new Event("cartUpdated"));
  };

  const selectedProducts = cartItems.filter((item) => selectedItems.includes(item.id));
  const totalAmount = selectedProducts.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = () => {
    if (!user) {
      setMessage("Please log in or sign up to checkout.");
      setMessageType("error");
      setTimeout(() => navigate("/profile"), 2000);
      return;
    }

    if (selectedItems.length === 0) {
      setMessage("Please select at least one product to buy.");
      setMessageType("error");
      return;
    }

    const userWallet = user.wallet || 0;
    if (userWallet < totalAmount) {
      setMessage(`Insufficient funds. You need $${(totalAmount - userWallet).toFixed(2)} more. Please top up your wallet.`);
      setMessageType("error");
      setTimeout(() => navigate("/profile"), 3000);
      return;
    }

    // Deduct from wallet
    const updatedUser = { ...user, wallet: userWallet - totalAmount };
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const userIndex = users.findIndex(u => u.id === user.id);
    if (userIndex !== -1) {
      users[userIndex] = updatedUser;
      localStorage.setItem("users", JSON.stringify(users));
    }
    localStorage.setItem("user", JSON.stringify(updatedUser));
    setUser(updatedUser);

    // Add to order history
    const order = {
      id: Date.now(),
      items: selectedProducts,
      total: totalAmount,
      date: new Date().toISOString(),
      status: "Delivered"
    };
    const userOrdersKey = `orders_${user.id}`;
    const existingOrders = JSON.parse(localStorage.getItem(userOrdersKey) || "[]");
    existingOrders.unshift(order);
    localStorage.setItem(userOrdersKey, JSON.stringify(existingOrders));

    setMessage(`✅ Purchase Successful! Total: $${totalAmount.toFixed(2)}`);
    setMessageType("success");
    const remaining = cartItems.filter((item) => !selectedItems.includes(item.id));
    setCartItems(remaining);
    setSelectedItems([]);
    localStorage.setItem("cart", JSON.stringify(remaining));
    window.dispatchEvent(new Event("cartUpdated"));
    window.dispatchEvent(new Event("walletUpdated"));
    window.dispatchEvent(new Event("orderHistoryUpdated"));
  };

  // auto-clear message
  useEffect(() => {
    if (!message) return;
    const t = setTimeout(() => setMessage(null), 4000);
    return () => clearTimeout(t);
  }, [message]);

  // Adjust bottomOffset so the bar doesn't overlap the footer when footer enters viewport
  useEffect(() => {
    const footer = () => document.querySelector("footer");

    function updateOffset() {
      const f = footer();
      const viewportHeight = window.innerHeight || document.documentElement.clientHeight;

      if (!f) {
        // No footer found - just keep base offset (16)
        setBottomOffset(16);
        return;
      }

      const rect = f.getBoundingClientRect();
      if (rect.top < viewportHeight) {
        const overlap = viewportHeight - rect.top;
        // raise the bar above footer + small gap
        setBottomOffset(overlap + 16);
      } else {
        setBottomOffset(16);
      }
    }

    window.addEventListener("scroll", updateOffset, { passive: true });
    window.addEventListener("resize", updateOffset);

    let ro;
    const fEl = footer();
    if (fEl && window.ResizeObserver) {
      ro = new ResizeObserver(updateOffset);
      ro.observe(fEl);
    }

    updateOffset();
    return () => {
      window.removeEventListener("scroll", updateOffset);
      window.removeEventListener("resize", updateOffset);
      if (ro && fEl) ro.unobserve(fEl);
    };
  }, []);

  // IMPORTANT: Add bottom padding to body so page content (hero etc.) is not covered by fixed checkout bar.
  useEffect(() => {
    // pad with checkout bar height + a little extra gap
    const padding = CHECKOUT_BAR_HEIGHT + 24;
    const previous = document.body.style.paddingBottom;
    document.body.style.paddingBottom = `${padding}px`;
    return () => {
      document.body.style.paddingBottom = previous;
    };
  }, []); // run once

  return (
    <div className="min-h-screen bg-[#fffaf5] p-8 animate-fade-in">
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
          <button onClick={() => setMessage(null)} className="ml-4 text-sm font-medium underline opacity-80">
            Dismiss
          </button>
        </div>
      )}

      <h1 className="text-2xl font-semibold mb-8 text-[#1e385b]">Your Cart</h1>

      {cartItems.length === 0 ? (
        <p className="text-gray-500">Your cart is empty.</p>
      ) : (
        <>
          <div className="space-y-4 max-w-4xl mx-auto">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className={`flex items-center justify-between bg-white shadow-md rounded-2xl p-4 hover:shadow-lg transition-all ${
                  selectedItems.includes(item.id) ? "ring-2 ring-[#102b5d]" : ""
                }`}
              >
                <input
                  type="checkbox"
                  checked={selectedItems.includes(item.id)}
                  onChange={() => handleSelect(item.id)}
                  className="w-5 h-5 accent-[#4a8cd2] cursor-pointer mr-4"
                />

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
                    <p className="text-sm text-gray-500">
                      Subtotal: <span className="text-[#007bff] font-semibold">${(item.price * item.quantity).toFixed(2)}</span>
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button onClick={() => handleQuantityChange(item.id, -1)} className="bg-gray-200 hover:bg-gray-300 px-2 rounded-full">
                      -
                    </button>
                    <span className="w-6 text-center">{item.quantity}</span>
                    <button onClick={() => handleQuantityChange(item.id, 1)} className="bg-gray-200 hover:bg-gray-300 px-2 rounded-full">
                      +
                    </button>
                  </div>

                  <FaTrashAlt onClick={() => handleRemove(item.id)} className="text-gray-400 hover:text-red-500 cursor-pointer ml-4" />
                </div>
              </div>
            ))}
          </div>

          {/* ==== Checkout Bar (fixed) ==== */}
          {/* NOTE: We removed the pointer-events-none wrapper so clicks work predictably.
              The bar uses a high z-index so it appears above hero/nav and we use document.body padding so it doesn't overlap content. */}
          <div
            className="fixed left-0 right-0 flex justify-center items-center z-[60] pointer-events-auto"
            style={{ bottom: bottomOffset }}
            aria-live="polite"
          >
            <div
              className="w-full max-w-4xl mx-auto bg-white shadow-lg rounded-2xl p-4 md:p-6 flex justify-between items-center"
              style={{ height: CHECKOUT_BAR_HEIGHT - 16 }} // adjust inner height to be consistent
            >
              <p className="text-lg font-semibold text-[#0a1a2f]">
                Total ({selectedItems.length} items):{" "}
                <span className="text-[#007bff]">${totalAmount.toFixed(2)}</span>
              </p>

              <button
                onClick={handleCheckout}
                className="bg-green-900 hover:bg-green-800 text-white px-6 md:px-8 py-2.5 rounded-full font-medium shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
              >
                Checkout
              </button>
            </div>
          </div>
          {/* ==== end checkout bar ==== */}
        </>
      )}

      <div className="max-w-4xl mx-auto py-16 px-4">
        <Link
          to="/shop"
          className="px-2 py-3 text-gray-800 rounded-2xl font-semibold shadow-lg hover:shadow-lg hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
        >
          ← Back to Shop
        </Link>
      </div>
    </div>
  );
}
