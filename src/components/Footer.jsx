import { FaFacebookF, FaInstagram, FaTiktok } from "react-icons/fa";

export default function Footer() {
  return (
    <footer id="footer" className="text-white py-10 mt-16 bg-[#83705f]">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8 text-center md:text-left">
        
        {/* Logo & Description */}
        <div>
          <div className="text-black text-xl font-bold flex items-center justify-center md:justify-start">
            <img 
              src="/logo_shop.png" 
              alt="Logo" 
              className="h-12 w-12"
            />
            <h3 className="ml-2 font-medium">Cloverleaf</h3>
          </div>
          <p className="mt-3 text-sm text-black/80">
            Your trusted source for gentle and effective skincare. <br />
            Because self-care starts with healthy skin.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-semibold text-lg mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="/" className="hover:text-blue-400">Home</a></li>
            <li><a href="/about" className="hover:text-blue-400">About</a></li>
            <li><a href="/contact" className="hover:text-blue-400">Contact</a></li>
            <li><a href="/shop" className="hover:text-blue-400">Shop</a></li>
          </ul>
        </div>

        {/* Customer Care */}
        <div>
          <h3 className="font-semibold text-lg mb-3">Customer Care</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-blue-400">FAQs</a></li>
            <li><a href="#" className="hover:text-blue-400">Shipping & Returns</a></li>
            <li><a href="#" className="hover:text-blue-400">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-blue-400">Terms of Service</a></li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="font-semibold text-lg mb-3">Follow Us</h3>
          <div className="flex justify-center md:justify-start space-x-4 text-xl">
            <a href="#" className="hover:text-blue-400"><FaFacebookF /></a>
            <a href="#" className="hover:text-blue-400"><FaInstagram /></a>
            <a href="#" className="hover:text-blue-400"><FaTiktok /></a>
          </div>

          <div className="mt-6">
            <p className="text-sm mb-2">Subscribe for updates</p>
            <form className="flex justify-center md:justify-start">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="px-3 py-2 rounded-l-md text-black text-sm focus:outline-none w-full max-w-xs"
              />
              <button 
                type="submit" 
                className="bg-green-900 hover:bg-green-800 px-4 py-2 rounded-r-md text-sm font-medium transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom text */}
      <div className="mt-8 border-t border-white/20 pt-4 text-center text-sm text-white/80">
        © {new Date().getFullYear()} Cloverleaf. All rights reserved.
      </div>
    </footer>
  );
}