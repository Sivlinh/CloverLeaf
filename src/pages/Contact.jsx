// import React from 'react'

// export default function Contact() {
//   return (
//     <div>
//         contact
//     </div>
//   )
// }
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-blue-50 py-12">
      <div className="max-w-5xl mx-auto px-6">
        <h1 className="text-3xl md:text-4xl font-bold text-center text-green-800 mb-4">
          Get in Touch
        </h1>
        <p className="text-center text-gray-600 mb-10">
          Have questions about our skincare products or need help with your order?  
          We’d love to hear from you!
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          
          {/* Left: Contact Info */}
          <div className="bg-white p-8 rounded-2xl shadow-md">
            <h2 className="text-2xl font-semibold text-green-800 mb-4">Contact Information</h2>
            <ul className="space-y-4 text-gray-700">
              <li className="flex items-center gap-3">
                <FaEnvelope className="text-green-600" />
                <span>support@cloverleaf.com</span>
              </li>
              <li className="flex items-center gap-3">
                <FaPhoneAlt className="text-green-600" />
                <span>+855 12 345 678</span>
              </li>
              <li className="flex items-center gap-3">
                <FaMapMarkerAlt className="text-green-600" />
                <span>Phnom Penh, Cambodia</span>
              </li>
            </ul>

            <div className="mt-6">
              {/* <iframe
                title="Cloverleaf Map"
                src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d21505.940494327413!2d104.90306033952223!3d11.578304387645755!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1skm!2skh!4v1760521425321!5m2!1skm!2skh"
                className="w-full h-30 rounded-lg border-0"
                allowFullScreen=""
                loading="lazy"
              ></iframe> */}
              <iframe src="https://www.google.com/maps/embed?pb=!1m10!1m8!1m3!1d81438.94953865092!2d104.86846991544489!3d11.578941876134145!3m2!1i1024!2i768!4f13.1!5e1!3m2!1skm!2sus!4v1760610350821!5m2!1skm!2sus" width="600" height="450"   loading="lazy"></iframe>
            </div>
          </div>

          {/* Right: Contact Form */}
          <div className="bg-white p-8 rounded-2xl shadow-md">
            <h2 className="text-2xl font-semibold text-green-800 mb-4">Send Us a Message</h2>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  placeholder="Your name"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-green-600"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-green-600"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Message
                </label>
                <textarea
                  placeholder="Write your message..."
                  rows="5"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-green-600"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}



