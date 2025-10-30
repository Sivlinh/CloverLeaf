import { FaFacebookF, FaInstagram, FaTiktok } from "react-icons/fa";

export default function Footer() {
  const linkClasses = "hover:text-white transition-colors duration-200 cursor-pointer text-sm text-gray-200";
  const socialIconClasses = "hover:scale-110 transition-transform duration-200";
  
  return (
    <footer id="footer" className="text-white py-10 mt-16 bg-[#ab8c6d]">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8 text-center md:text-left">
        
        {/* Logo & Description */}
        <div>
          <div className="flex items-center justify-center md:justify-start mb-3">
            <img
              src="/logo_shop.png"
              alt="Cloverleaf Logo"
              className="h-12 w-12 rounded-full"
            />
            <h3 className="ml-2 text-2xl font-semibold text-white">Cloverleaf</h3>
          </div>
          <p className="text-sm text-gray-200 mb-4">
            Your trusted source for gentle and effective skincare.
            Because self-care starts with healthy skin.
          </p>
          
          {/* Contact Info */}
          <div className="text-sm text-gray-200">
            <p>contact@cloverleaf.com</p>
            <p>+855 12 345 678</p>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-semibold text-lg mb-3">Quick Links</h3>
          <ul className="space-y-2">
            {['Home', 'About', 'Contact', 'Shop'].map((item) => (
              <li key={item}>
                <a href={`/${item.toLowerCase()}`} className={linkClasses}>
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Customer Care */}
        <div>
          <h3 className="font-semibold text-lg mb-3">Customer Care</h3>
          <ul className="space-y-2">
            {['FAQs', 'Shipping & Returns', 'Privacy Policy', 'Terms of Service'].map((item) => (
              <li key={item}>
                <a href="#" className={linkClasses}>
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Social Media & Newsletter */}
        <div>
          <h3 className="font-semibold text-lg mb-3">Follow Us</h3>
          <div className="flex space-x-4 text-xl justify-center md:justify-start">
            <a href="#" className={`${socialIconClasses} hover:text-blue-400`} aria-label="Facebook">
              <FaFacebookF />
            </a>
            <a href="#" className={`${socialIconClasses} hover:text-pink-400`} aria-label="Instagram">
              <FaInstagram />
            </a>
            <a href="#" className={`${socialIconClasses} hover:text-gray-800`} aria-label="TikTok">
              <FaTiktok />
            </a>
          </div>

          {/* Newsletter */}
          <div className="mt-6">
            <p className="text-sm mb-2">Subscribe for updates</p>
            <div className="flex max-w-xs mx-auto md:mx-0">
            
         
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-gray-500 mt-10 pt-4 text-center text-sm text-gray-300">
        © {new Date().getFullYear()} Cloverleaf. All rights reserved.
      </div>
    </footer>
  );
}