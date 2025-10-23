import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function Nav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const location = useLocation();
  const navigate = useNavigate();

  // Update cart count from localStorage
  useEffect(() => {
    const updateCartCount = () => {
      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      setCartCount(cart.length);
    };

    updateCartCount();

    // Listen for storage changes (when cart is updated from other components)
    const handleStorageChange = (e) => {
      if (e.key === "cart") {
        updateCartCount();
      }
    };

    window.addEventListener("storage", handleStorageChange);

    // Custom event listener for cart updates within the same tab
    const handleCartUpdate = () => updateCartCount();
    window.addEventListener("cartUpdated", handleCartUpdate);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("cartUpdated", handleCartUpdate);
    };
  }, []);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/shop", label: "Shop" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ];

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleSearch = () => {
    setShowSearch((s) => !s);
    setIsSearchExpanded((s) => !s);
  };
  // hover behavior: expand on hover, collapse after small delay when leaving
  const hoverTimer = useRef(null);
  const openSearch = () => {
    clearTimeout(hoverTimer.current);
    setShowSearch(true);
    setIsSearchExpanded(true);
  };
  const closeSearchWithDelay = () => {
    clearTimeout(hoverTimer.current);
    hoverTimer.current = setTimeout(() => {
      // only close if input isn't focused
      if (document.activeElement !== searchInputRef.current) {
        setShowSearch(false);
        setIsSearchExpanded(false);
      }
    }, 300);
  };
  const isActiveLink = (path) => location.pathname === path;

  // 🌟 Search function (navigates to shop with query)
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim() !== "") {
      navigate(`/shop?search=${encodeURIComponent(searchTerm)}`);
      setShowSearch(false);
      setIsSearchExpanded(false);
      setSearchTerm("");
    }
  };

  // focus the search input when expanded for keyboard users
  const searchInputRef = useRef(null);
  useEffect(() => {
    if (isSearchExpanded) {
      // small timeout to allow animation to complete
      setTimeout(() => searchInputRef.current?.focus(), 80);
    }
  }, [isSearchExpanded]);

  return (
    <div>
      <nav className="fixed top-0 left-0 w-full z-50 bg-white/20 backdrop-blur-xl border-b border-white/30 shadow-[0_4px_30px_rgba(0,0,0,0.1)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-6">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link to="/" className="flex items-center">
                <img src="logo_shop.png" alt="Logo" className="h-12 w-12" />
                <span className="ml-2 text-black text-xl font-semibold">
                  Cloverleaf
                </span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    to={link.href}
                    className={`px-3 py-2 rounded-3xl text-sm font-medium transition-all duration-300 ${
                      isActiveLink(link.href)
                        ? "text-gray-800 bg-white/30 shadow-sm"
                        : "text-gray-800 hover:text-gray-900 hover:bg-white/20"
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Right Icons */}
            <div className="flex items-center space-x-4 ">
              
              {/* Search Button */}
              <div onMouseEnter={openSearch} onMouseLeave={closeSearchWithDelay} className="rounded-[25px]">
              <button
                onClick={toggleSearch}
                aria-expanded={isSearchExpanded}
                aria-label={isSearchExpanded ? 'Close search' : 'Open search'}
                title="Search products"
                className="group p-2 text-gray-700 hover:text-gray-900 hover:bg-white/30 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-300 transition-all duration-200 rounded-[25px]"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  role="img"
                  aria-hidden="true"
                  focusable="false"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 group-hover:scale-110 transition-transform duration-200"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m21 21-5.197-5.197m0 0A7.5
                    7.5 0 1 0 5.196 5.196a7.5
                    7.5 0 0 0 10.607 10.607Z"
                  />
                </svg>
              </button>
              </div>
             {/* Cool Search Input with Animation */}
             <div
               onMouseEnter={openSearch}
               onMouseLeave={closeSearchWithDelay}
               className={`absolute top-16 right-8 bg-white shadow-xl rounded-[25px] border border-gray-300 overflow-hidden transition-all duration-300 ease-in-out ${
                 isSearchExpanded ? 'w-[320px] opacity-100' : 'w-0 opacity-0'
               }`}
             >
               <form
                 onSubmit={handleSearch}
                 className="flex items-center"
               >
                 <input
                   type="text"
                   ref={searchInputRef}
                   value={searchTerm}
                   onChange={(e) => setSearchTerm(e.target.value)}
                   placeholder="Search for products..."
                   className="flex-1 px-4 py-3 text-gray-700 placeholder-gray-400 focus:outline-none text-sm bg-transparent"
                   autoFocus={isSearchExpanded}
                 />
                 <button
                   type="submit"
                   className="p-3 text-gray-600 hover:text-blue-500 transition-all duration-200 bg-transparent"
                 >
                   <svg
                     xmlns="http://www.w3.org/2000/svg"
                     fill="none"
                     viewBox="0 0 24 24"
                     strokeWidth={1.5}
                     stroke="currentColor"
                     className="w-5 h-5"
                   >
                     <path
                       strokeLinecap="round"
                       strokeLinejoin="round"
                       d="m21 21-5.197-5.197m0 0A7.5
                       7.5 0 1 0 5.196 5.196a7.5
                       7.5 0 0 0 10.607 10.607Z"
                     />
                   </svg>
                 </button>
               </form>
             </div>






              
              {/* Cart */}
              <Link
                to="/cart"
                className="relative p-2 text-gray-700 hover:text-gray-900 hover:bg-white/30 rounded-[25px] transition-all duration-300 group"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 group-hover:scale-110 transition-transform duration-200"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993
                    1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125
                    1.125 0 0 1-1.12-1.243l1.264-12A1.125
                    1.125 0 0 1 5.513 7.5h12.974c.576 0
                    1.059.435 1.119 1.007ZM8.625
                    10.5a.375.375 0 1 1-.75 0
                    .375.375 0 0 1 .75 0Zm7.5
                    0a.375.375 0 1 1-.75 0
                    .375.375 0 0 1 .75 0Z"
                  />
                </svg>
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-gradient-to-r from-[#d8554e] to-[#d8554e] text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center shadow-lg ">
                    {cartCount > 99 ? '99+' : cartCount}
                  </span>
                )}
              </Link>

            
  
                      
              {/* Profile */}
              <Link
                to="/profile"
                className="group p-2 text-gray-700 hover:text-gray-900 hover:bg-white/30 rounded-[25px] transition-all duration-300"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 group-hover:scale-110 transition-transform duration-200"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.982 18.725A7.488 7.488 0 0
                    0 12 15.75a7.488 7.488 0 0
                    0-5.982 2.975m11.963 0a9
                    9 0 1 0-11.963 0m11.963
                    0A8.966 8.966 0 0 1 12
                    21a8.966 8.966 0 0 1-5.982-2.275M15
                    9.75a3 3 0 1 1-6 0 3 3
                    0 0 1 6 0Z"
                  />
                </svg>
              </Link>

              {/* Mobile Menu Button */}
              <div className="md:hidden">
                <button
                  onClick={toggleMenu}
                  className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-white/30 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-500 transition-all duration-300"
                >
                  {isMenuOpen ? (
                    <svg
                      className="h-6 w-6"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="h-6 w-6"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 6h16M4 12h16M4 18h16"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Menu */}
          <div className={`${isMenuOpen ? "block" : "hidden"} md:hidden`}>
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white/20 backdrop-blur-lg rounded-lg mt-2 border border-white/30 shadow-md">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`block px-3 py-2 rounded-md text-base font-medium transition-all duration-300 ${
                    isActiveLink(link.href)
                      ? "text-gray-900 bg-white/40"
                      : "text-gray-800 hover:text-gray-900 hover:bg-white/30"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </nav>

      <div className="h-16"></div>
    </div>
  );
}
