import React from 'react';

export default function About() {
  return (
    <div id="bodybg" className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">About Cloverleaf</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            We’re more than a skincare brand — we’re your daily reminder to care for yourself. 
            At Cloverleaf, we believe good skin is about confidence, not perfection.
          </p>
        </div>

        {/* Our Story */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Story</h2>
            <p className="text-gray-600 mb-4">
              Cloverleaf started in 2025 with a simple idea: skincare should be easy, 
              honest, and made for everyone. We wanted to create products that actually work 
              and make you feel good — no unrealistic promises, no fancy filters.
            </p>
            <p className="text-gray-600">
              From cleansers to serums, every product is made with love and clean ingredients 
              that your skin will thank you for. Because when your skin’s happy, you glow differently.
            </p>
          </div>

          <div>
            <img 
              src="shop1.png" 
              alt="Skincare routine" 
              className="rounded-lg shadow-md w-full h-85 object-cover"
            />
          </div>
        </div>

        {/* Mission & Values */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Our Mission</h2>
          <p className="text-gray-600 text-center text-lg">
            To make skincare simple, sustainable, and kind — to your skin and the planet.  
            We want everyone to feel confident in their natural glow, no filters needed.
          </p>
        </div>

        {/* Why Choose Us */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Why You’ll Love Cloverleaf</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Clean & Effective</h3>
              <p className="text-gray-600">No harsh stuff — just ingredients your skin actually needs.</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Made with Love</h3>
              <p className="text-gray-600">We test everything gently — so your skin always feels cared for.</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Eco-Friendly</h3>
              <p className="text-gray-600">Sustainable packaging that’s as gentle on the planet as it is on your skin.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
