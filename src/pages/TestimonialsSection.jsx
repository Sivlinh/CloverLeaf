import React, { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { div } from 'framer-motion/client';

export const TestimonialsSection = () => {
  const title = 'What Our Customers Say About Cloverleaf';
  const [isHovered, setIsHovered] = useState(false);

  const testimonials = [
    {
      id: 1,
      name: 'Suy Sivlinh',
      role: 'Beauty Enthusiast',
      company: '',
      content: 'Cloverleaf’s products transformed my daily skincare routine. My skin has never felt this soft and radiant!',
      avatar: 'SL',
    },
    {
      id: 2,
      name: 'Hong Samphors',
      role: 'Influencer',
      company: '',
      content: 'I love the natural ingredients! My skin feels hydrated and glowing without any harsh chemicals.',
      avatar: 'MC',
    },
    {
      id: 3,
      name: 'Hout Nova',
      role: 'Skincare Blogger',
      company: '',
      content: 'These serums and moisturizers are a game-changer. I feel confident showing my skin naturally.',
      avatar: 'ED',
    },
    {
      id: 4,
      name: 'Man Vann..da',
      role: 'Wellness Coach',
      company: '',
      content: 'Caring for your skin has never been easier. Cloverleaf makes every day a spa-like experience at home.',
      avatar: 'LW',
    },
  ];

  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true });

  return (
    <div>
      <div id="bodybg" className="mt-6  text-balance text-2xl font-semibold text-[#3e2f24] sm:text-4xl md:text-5xl">
        <h2></h2>

      </div>
      {/* ✨ Testimonials Section */}
    <section
      ref={containerRef}
      id="testimonials"
      className="relative overflow-hidden  px-6 py-20"
    >
      <div className="pointer-events-none absolute inset-x-0 top-24 mx-auto h-64 max-w-5xl rounded-[120px] bg-gradient-to-b from-[#f3efe8] via-white to-transparent blur-3xl" />

      <div className="relative mx-auto max-w-6xl">
        <motion.div
          className="mx-auto max-w-3xl text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
         
          <motion.h2
            className="mt-6 text-balance text-3xl font-semibold text-[#3e2f24] sm:text-4xl md:text-5xl"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {title}
          </motion.h2>
          <p className="mt-6 text-lg text-[#3e2f24]">
            Hear from our happy customers who discovered the power of natural, effective skincare.
          </p>
        </motion.div>

        <div
          className="relative mt-16 overflow-hidden"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          style={{
            maskImage: 'linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)',
          }}
        >
          <motion.div
            className="flex gap-6"
            animate={isHovered ? {} : { x: [0, -100 * testimonials.length] }}
            transition={isHovered ? {} : { x: { repeat: Infinity, repeatType: 'loop', duration: 50, ease: 'linear' } }}
            style={{ width: `${240 * testimonials.length}%` }}
          >
            {[...Array(2)].flatMap((_, loopIndex) =>
              testimonials.map((testimonial) => (
                <motion.div
                  key={`${loopIndex}-${testimonial.id}`}
                  className="relative flex w-[22rem] flex-shrink-0 flex-col gap-5 rounded-[32px] border border-white/70 bg-white/90 p-8 text-left shadow-[0_30px_70px_-60px_rgba(0,0,0,0.7)] backdrop-blur transition-transform duration-300 hover:-translate-y-2"
                >
                  <div className="pointer-events-none absolute -right-6 top-8 h-20 w-20 rounded-full bg-gradient-to-br from-[#d8e2d7] to-[#f3e6d8] opacity-70 blur-2xl" />
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full border border-zinc-200 bg-white text-sm font-semibold text-zinc-800">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-[#3e2f24]">{testimonial.name}</div>
                      <div className="text-xs text-zinc-500">
                        {testimonial.role} {testimonial.company && `· ${testimonial.company}`}
                      </div>
                    </div>
                  </div>
                  <blockquote className="text-base leading-relaxed text-[#3e2f24]">
                    “{testimonial.content}”
                  </blockquote>
                  <div className="mt-auto text-xs font-semibold uppercase tracking-[0.4em] text-[#7c8b74]">
                    Cloverleaf Story
                  </div>
                </motion.div>
              ))
            )}
          </motion.div>
        </div>
      </div>
    </section>



    {/* ✨ Brand Logos Section */}
<section id='bodybg' className="py-12 bg-white">
  <div className="max-w-6xl mx-auto px-6">
    <h3 className="text-xl md:text-xl font-semibold text-[#3e2f24] text-center mb-8">
      Trusted by Leading Skincare Brands
    </h3>
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 items-center justify-items-center">
      {[
        "public/Logo/logo1.png",
        "public/Logo/logo2.png",
        "public/Logo/logo3.png",
        "public/Logo/logo4.png",
        "public/Logo/logo5.png",
      ].map((logo, index) => (
        <div key={index} className="flex items-center justify-center p-4  rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
          <img src={logo} alt={`Brand ${index + 1}`} className="h-10 object-contain" />
        </div>
      ))}
    </div>
  </div>
</section>

    </div>






    
  );
};



