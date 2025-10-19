// import { Routes, Route } from "react-router-dom";
// import Nav from "./components/Nav";
// import Home from "./pages/Home";
// import About from "./pages/About";
// import Contact from "./pages/Contact";
// import Profile from "./pages/Profile";
// import Cart from "./pages/Cart";
// import Hero from "./components/Hero";
// import Footer from "./components/Footer";

// export default function App() {
//   return (
//     <div>
//       <Nav />
      
//       <Hero />
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/about" element={<About />} />
//         <Route path="/contact" element={<Contact />} />
//         <Route path="/cart" element={<Cart />} />
//         <Route path="/profile" element={<Profile />} />
//       </Routes>
    
//       <Footer />

//     </div>
//   );
// }


import { Routes, Route } from "react-router-dom";
import Nav from "./components/Nav";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Cart from "./pages/Cart";
import Profile from "./pages/Profile";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import Shop from "./pages/Shop";
import React from "react";
export default function App() {
  return (
    <div className="App">
      <Nav />
      <Hero />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
       
        <Route path="/contact" element={<Contact />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/shop" element={<Shop />} />
      </Routes>
      <Footer />
    </div>
  );
}