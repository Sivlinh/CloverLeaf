import { Routes, Route } from "react-router-dom";
import Nav from "./components/Nav";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Cart from "./pages/Cart";
import Profile from "./pages/Profile";
import Footer from "./components/Footer";
import Shop from "./pages/Shop";
import Search from "./pages/Search";
import React from "react";
import ProductDetail from "./pages/ProductDetail";
import DetailShop from "./pages/DetailShop";
import Hero from "./components/Hero";
import { TestimonialsSection } from "./pages/TestimonialsSection";


export default function App() {
  return (
    <div className="App" id="bodybg">
      <Nav />
      <Hero />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/detail/:id" element={<DetailShop />} />
        <Route path="/search" element={<Search />} />
      </Routes>
      <TestimonialsSection />


     
      

      <Footer />
    </div>
  );
}

