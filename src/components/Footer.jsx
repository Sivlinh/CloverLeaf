import { FaFacebookF, FaInstagram, FaTiktok } from "react-icons/fa";
import Home from "../pages/Home";

export default function Footer() {
  return (
    <footer className="bg-slate-500 text-white py-10 mt-16">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">

        {/* Logo & Description */}
        <div>
          <div className="ml-2 text-black text-xl font-bold flex items-center">
             <img 
                  src="public/logo_shop.png" 
                  alt="Logo" 
                  className="h-12 w-12"
                />
             <h3 className="ml-2 font-medium"> Cloverleaf</h3>
          </div>
          <p className="mt-3 text-sm">
            Your trusted source for gentle and effective skincare. <br />
            Because self-care starts with healthy skin.
          </p>
          
          
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-semibold text-lg mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="/"  className="hover:text-green-600">Home</a></li>
            <li><a href="/about" className="hover:text-green-600">About</a></li>
            <li><a href="/contact" className="hover:text-green-600">Contact</a></li>
            <li><a href="/shop" className="hover:text-green-600">Shop</a></li>
          </ul>
        </div>

        {/* Customer Care */}
        <div>
          <h3 className="font-semibold text-lg mb-3">Customer Care</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-green-600">FAQs</a></li>
            <li><a href="#" className="hover:text-green-600">Shipping & Returns</a></li>
            <li><a href="#" className="hover:text-green-600">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-green-600">Terms of Service</a></li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="font-semibold text-lg mb-3">Follow Us</h3>
          <div className="flex space-x-4 text-xl">
            <a href="#" className="hover:text-green-600"><FaFacebookF /></a>
            <a href="#" className="hover:text-green-600"><FaInstagram /></a>
            <a href="#" className="hover:text-green-600"><FaTiktok /></a>
          </div>

          {/* Optional Newsletter */}
          <div className="mt-6">
            <p className="text-sm mb-2">Subscribe for updates</p>
            <form className="flex">
              
            </form>
          </div>

          {<p className="mt-6 text-sm flex justify-content-center text-gray-500">
            © 2025 Cloverleaf. All rights reserved.
          </p>}
        </div>

      </div>
    </footer>
  );
}
