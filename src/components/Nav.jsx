import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

// Constants
const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Shop" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

const SEARCH_CLOSE_DELAY = 300;
const SEARCH_FOCUS_DELAY = 80;

export default function Nav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  const location = useLocation();
  const navigate = useNavigate();
  const hoverTimer = useRef(null);
  const searchInputRef = useRef(null);

  const updateCartCount = useCallback(() => {
    try {
      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      setCartCount(cart.length);
    } catch {
      setCartCount(0);
    }
  }, []);

  useEffect(() => {
    updateCartCount();
    const handleStorageChange = (e) => {
      if (e.key === "cart") updateCartCount();
    };
    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("cartUpdated", updateCartCount);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("cartUpdated", updateCartCount);
    };
  }, [updateCartCount]);

  const navLinks = useMemo(() => NAV_LINKS, []);
  const toggleMenu = useCallback(() => setIsMenuOpen((prev) => !prev), []);

  const toggleSearch = useCallback(() => {
    setShowSearch((prev) => !prev);
    setIsSearchExpanded((prev) => !prev);
  }, []);

  const openSearch = useCallback(() => {
    clearTimeout(hoverTimer.current);
    setShowSearch(true);
    setIsSearchExpanded(true);
  }, []);

  const closeSearchWithDelay = useCallback(() => {
    clearTimeout(hoverTimer.current);
    hoverTimer.current = setTimeout(() => {
      if (document.activeElement !== searchInputRef.current) {
        setShowSearch(false);
        setIsSearchExpanded(false);
      }
    }, SEARCH_CLOSE_DELAY);
  }, []);

  const handleSearch = useCallback(
    (e) => {
      e.preventDefault();
      const trimmedTerm = searchTerm.trim();
      if (trimmedTerm) {
        navigate(`/shop?search=${encodeURIComponent(trimmedTerm)}`);
        setShowSearch(false);
        setIsSearchExpanded(false);
        setSearchTerm("");
      }
    },
    [searchTerm, navigate]
  );

  useEffect(() => {
    if (isSearchExpanded) {
      const timer = setTimeout(() => {
        searchInputRef.current?.focus();
      }, SEARCH_FOCUS_DELAY);
      return () => clearTimeout(timer);
    }
  }, [isSearchExpanded]);

  const isActiveLink = useCallback(
    (path) => location.pathname === path,
    [location.pathname]
  );

  return (
    <div>
      {/* Main Nav */}
      <nav
        className="fixed top-0 left-0 w-full z-50 bg-gradient-to-b from-white/30 via-white/20 to-transparent backdrop-blur-xl border-b border-white/30 shadow-[0_4px_30px_rgba(0,0,0,0.1)] transition-all duration-500"
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-6">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link
                to="/"
                className="flex items-center focus:outline-none focus:ring-2 focus:ring-blue-300 rounded-lg"
                aria-label="Go to homepage"
              >
                <img
                  src="logo_shop.png"
                  alt="Cloverleaf Logo"
                  className="h-12 w-12"
                  loading="lazy"
                />
                <span className="ml-2 text-black text-xl font-semibold">
                  Cloverleaf
                </span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:block" aria-label="Desktop navigation">
              <ul className="ml-10 flex items-baseline space-x-4" role="menubar">
                {navLinks.map((link) => (
                  <li key={link.href} role="none">
                    <Link
                      to={link.href}
                      role="menuitem"
                      className={`px-3 py-2 rounded-3xl text-sm font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-300 ${
                        isActiveLink(link.href)
                          ? "text-gray-800 bg-white/30 shadow-sm"
                          : "text-gray-800 hover:text-gray-900 hover:bg-white/20"
                      }`}
                      aria-current={isActiveLink(link.href) ? "page" : undefined}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Cart, Search, Profile, Mobile Menu */}
            <div className="flex items-center space-x-4">
              {/* Search */}
              <div className="relative flex items-center space-x-3">
                <div onMouseEnter={openSearch} onMouseLeave={closeSearchWithDelay}>
                  <button
                    onClick={toggleSearch}
                    aria-expanded={isSearchExpanded}
                    aria-label={isSearchExpanded ? "Close search" : "Open search"}
                    title="Search products"
                    className="group p-2 text-gray-700 hover:text-gray-900 hover:bg-white/30 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-300 transition-all duration-200 rounded-[25px]"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6 group-hover:scale-110 transition-transform duration-200"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                      />
                    </svg>
                  </button>
                </div>

                <div
                  onMouseEnter={openSearch}
                  onMouseLeave={closeSearchWithDelay}
                  className={`absolute top-1/2 right-0 -translate-y-1/2 bg-white shadow-xl rounded-[25px] border border-gray-300 overflow-hidden transition-all duration-300 ease-in-out ${
                    isSearchExpanded ? "w-[320px] opacity-100" : "w-0 opacity-0"
                  }`}
                  role="search"
                  aria-label="Product search"
                >
                  <form onSubmit={handleSearch} className="flex items-center">
                    <label htmlFor="search-input" className="sr-only">
                      Search for products
                    </label>
                    <input
                      id="search-input"
                      type="text"
                      ref={searchInputRef}
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      placeholder="Search for products..."
                      className="flex-1 px-4 py-3 text-gray-700 placeholder-gray-400 focus:outline-none text-sm bg-transparent"
                      autoComplete="off"
                    />
                    <button
                      type="submit"
                      className="p-3 text-gray-600 hover:text-blue-500 transition-all duration-200 bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-300 rounded"
                      aria-label="Submit search"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-5 h-5"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                        />
                      </svg>
                    </button>
                  </form>
                </div>
              </div>

              {/* Cart */}
              <Link
                to="/cart"
                className="relative p-2 text-gray-700 hover:text-gray-900 hover:bg-white/30 rounded-[25px] transition-all duration-300 group focus:outline-none focus:ring-2 focus:ring-blue-300"
                aria-label={`Shopping cart with ${cartCount} items`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 group-hover:scale-110 transition-transform duration-200"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                  />
                </svg>
                {cartCount > 0 && (
                  <span
                    className="absolute -top-2 -right-2 bg-[#d8554e] text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center shadow-lg"
                    aria-label={`${cartCount} items in cart`}
                  >
                    {cartCount > 99 ? "99+" : cartCount}
                  </span>
                )}
              </Link>

              {/* Profile */}
              <Link
                to="/profile"
                className="group p-2 text-gray-700 hover:text-gray-900 hover:bg-white/30 rounded-[25px] transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-300"
                aria-label="Go to profile"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 group-hover:scale-110 transition-transform duration-200"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                  />
                </svg>
              </Link>

              {/* Mobile Menu Toggle */}
              <div className="md:hidden">
                <button
                  onClick={toggleMenu}
                  aria-expanded={isMenuOpen}
                  aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                  className="inline-flex items-center justify-center p-2 rounded-2xl text-gray-700 hover:text-gray-900 hover:bg-white/30 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-500 transition-all duration-300"
                >
                  {isMenuOpen ? (
                    <svg
                      className="h-6 w-6"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  ) : (
                    <svg
                      className="h-6 w-6"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Menu */}
          <nav
            className={`${isMenuOpen ? "block" : "hidden"} md:hidden`}
            aria-label="Mobile navigation"
          >
            <ul
              className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white/20 backdrop-blur-lg rounded-lg mt-2 border border-white/30 shadow-md"
              role="menu"
            >
              {navLinks.map((link) => (
                <li key={link.href} role="none">
                  <Link
                    to={link.href}
                    onClick={() => setIsMenuOpen(false)}
                    role="menuitem"
                    className={`block px-3 py-2 rounded-md text-base font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-300 ${
                      isActiveLink(link.href)
                        ? "text-gray-900 bg-white/40"
                        : "text-gray-800 hover:text-gray-900 hover:bg-white/30"
                    }`}
                    aria-current={isActiveLink(link.href) ? "page" : undefined}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </nav>

      {/* Spacer for fixed nav */}
      <div className="h-16" aria-hidden="true"></div>
    </div>
  );
}
