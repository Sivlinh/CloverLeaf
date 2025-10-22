import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function Nav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/shop", label: "Shop" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ];

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleSearch = () => setShowSearch(!showSearch);
  const isActiveLink = (path) => location.pathname === path;

  // 🌟 Search function (navigates to shop with query)
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim() !== "") {

     
      navigate(`/shop?search=${encodeURIComponent(searchTerm)}`);
      navigate(`/shop?search=${encodeURIComponent(searchTerm)}`);

      setShowSearch(false);
      setSearchTerm("");
    }
  };

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
            <div className="flex items-center space-x-4">
              
              {/* Search Button */}
              <button
                onClick={toggleSearch}
                className="p-2 text-gray-700 hover:text-gray-900 hover:bg-white/30 rounded-md transition-all duration-300"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
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
{/* 
               Cool Search Popup */}
              {showSearch && (
                <form
                  onSubmit={handleSearch}
                  className="absolute top-16 right-8 bg-white shadow-xl rounded-lg border border-gray-300 w-[320px] animate-fadeIn"
                >
                  <div className="flex items-center px-3">
                    <input
                      type="text"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      placeholder="Search for products..."
                      className="flex-1 px-3 py-2 text-gray-700 placeholder-gray-400 focus:outline-none text-sm"
                    />
                    <button
                      type="submit"
                      className="p-2 text-gray-600 hover:text-blue-500 transition-all duration-200"
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
                  </div>
                </form>
              )} 






              
              {/* Cart */}
              <Link
                to="/cart"
                className="relative p-2 text-gray-700 hover:text-gray-900 hover:bg-white/30 rounded-md transition-all duration-300"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
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
                <span className="absolute -top-1 -right-0 bg-blue-500 text-white text-xs rounded-full h-3 w-3 flex items-center justify-center"></span>
              </Link>

            
  
                      
              {/* Profile */}
              <Link
                to="/profile"
                className="p-2 text-gray-700 hover:text-gray-900 hover:bg-white/30 rounded-md transition-all duration-300"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
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
