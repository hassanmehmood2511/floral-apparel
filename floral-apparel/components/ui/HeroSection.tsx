/**
 * Purpose: Hero section component for the homepage
 * Author: [Author Placeholder]
 * Date: [Date Placeholder]
 */
import React from 'react';
import Link from 'next/link';

export default function HeroSection() {
  return (
    <section className="relative w-full min-h-[90vh] bg-white flex items-center overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10 py-20 lg:py-0">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-8">
          {/* Left Side: Content (60% on desktop) */}
          <div className="w-full lg:w-[60%] flex flex-col justify-center text-center lg:text-left pt-10 lg:pt-0">
            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-extrabold text-charcoal leading-tight mb-6 opacity-0 animate-slide-up">
              Wear What <br className="hidden sm:block" />
              <span className="text-blush-dark italic">Blooms</span> Within You
            </h1>

            <p className="font-body text-lg sm:text-xl text-charcoal/80 mb-10 max-w-2xl mx-auto lg:mx-0 opacity-0 animate-slide-up [animation-delay:200ms]">
              Discover our exclusive collection of timeless, elegant clothing designed to make you
              feel as beautiful on the outside as you are on the inside. Elevate your everyday
              wardrobe with Floral Apparel.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 opacity-0 animate-slide-up [animation-delay:400ms]">
              <Link
                href="/shop"
                className="w-full sm:w-auto px-8 py-4 bg-blush hover:bg-blush-dark text-white font-semibold rounded-full shadow-md hover:shadow-lg transition-all duration-300 text-center"
              >
                Shop Now
              </Link>
              <Link
                href="/lookbook"
                className="w-full sm:w-auto px-8 py-4 bg-transparent border-2 border-pistachio hover:border-pistachio-dark hover:bg-pistachio-light text-charcoal font-semibold rounded-full shadow-sm hover:shadow-md transition-all duration-300 text-center"
              >
                View Lookbook
              </Link>
            </div>
          </div>

          {/* Right Side: Image Placeholder & Badge (40% on desktop) */}
          <div className="w-full lg:w-[40%] relative mt-12 lg:mt-0 opacity-0 animate-slide-up [animation-delay:600ms]">
            <div className="relative w-full aspect-[4/5] rounded-[2rem] overflow-hidden shadow-2xl bg-gradient-to-br from-pistachio to-blush flex items-center justify-center border-4 border-white">
              {/* Optional: Add a subtle overlay pattern or keep it purely gradient as a placeholder */}
              <div className="text-white/60 font-display text-2xl font-bold italic tracking-wider">
                Floral Apparel
              </div>
            </div>

            {/* Floating Badge */}
            <div className="absolute -left-6 sm:-left-12 top-1/4 bg-white/90 backdrop-blur-sm border border-cream px-6 py-4 rounded-full shadow-xl animate-float z-20 hidden sm:flex items-center gap-3">
              <span className="text-2xl">✨</span>
              <div>
                <p className="text-xs text-charcoal/60 uppercase tracking-widest font-semibold">
                  Featured
                </p>
                <p className="font-display font-bold text-charcoal">New Collection 2024</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SVG Wave Divider at the bottom */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none z-0">
        <svg
          className="relative block w-full h-[60px] md:h-[120px]"
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C57.71,114.81,123.71,118.84,185.34,108.64Z"
            className="fill-cream"
          ></path>
        </svg>
      </div>
    </section>
  );
}
