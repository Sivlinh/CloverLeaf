import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

export default function Nav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const location = useLocation();

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/shop", label: "Shop" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ];

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleSearch = () => setShowSearch(!showSearch);

  const isActiveLink = (path) => location.pathname === path;

  return (
    <div>
      <nav className="fixed top-0 left-0 w-full bg-blue-100 shadow-md z-50">
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

            {/* Desktop Navigation Links */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    to={link.href}
                    className={`px-3 py-2 rounded-3xl text-sm font-medium transition-colors duration-200 ${
                      isActiveLink(link.href)
                        ? "text-gray-800 bg-gray-500/10"
                        : "text-gray-800 hover:text-gray-900 hover:bg-gray-500/10"
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Icons Section */}
            <div className="flex items-center space-x-4">
              {/* Cart Icon */}
              <Link
                to="/cart"
                className="relative p-2 text-gray-700 hover:text-gray-900 hover:bg-gray-200 rounded-md transition-colors duration-200"
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

              {/* Search Icon */}
              <button
                onClick={toggleSearch}
                className="p-2 text-gray-700 hover:text-gray-900 hover:bg-gray-200 rounded-md transition-colors duration-200"
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

              {/* Search Popup */}
              {showSearch && (
                <div className="absolute top-16 right-10 bg-white shadow-lg rounded-lg p-3 flex items-center w-64 border border-gray-200">
                  <input
                    type="text"
                    placeholder="Search..."
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300 text-sm"
                  />
                  <button className="ml-2 bg-blue-500 text-white px-3 py-2 rounded-md text-sm hover:bg-blue-600">
                    Go
                  </button>
                </div>
              )}

              {/* Profile Icon */}
              <Link
                to="/profile"
                className="p-2 text-gray-700 hover:text-gray-900 hover:bg-gray-200 rounded-md transition-colors duration-200"
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
                  className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-500"
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
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-gray-200 rounded-lg mt-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${
                    isActiveLink(link.href)
                      ? "text-gray-900 bg-gray-300"
                      : "text-gray-700 hover:text-gray-900 hover:bg-gray-300"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Spacer for fixed nav */}
      <div className="h-16"></div>
    </div>
  );
}
