/**
 * Purpose: Global footer component for the application
 * Author: [Author Placeholder]
 * Date: [Date Placeholder]
 */
import React from 'react';
import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-pistachio-dark text-cream pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 mb-12">
          {/* Brand & Tagline */}
          <div className="col-span-1 md:col-span-1">
            <h2 className="font-display text-2xl font-bold mb-4">🌸 Floral Apparel</h2>
            <p className="text-cream/90 italic">Elegance in every thread</p>
          </div>

          {/* Quick Links */}
          <div className="col-span-1">
            <h3 className="font-display text-lg font-semibold mb-4 uppercase tracking-wider">
              Quick Links
            </h3>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-cream/80 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-cream/80 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/shop" className="text-cream/80 hover:text-white transition-colors">
                  Shop
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-cream/80 hover:text-white transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div className="col-span-1">
            <h3 className="font-display text-lg font-semibold mb-4 uppercase tracking-wider">
              Categories
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/category/tops"
                  className="text-cream/80 hover:text-white transition-colors"
                >
                  Tops
                </Link>
              </li>
              <li>
                <Link
                  href="/category/dresses"
                  className="text-cream/80 hover:text-white transition-colors"
                >
                  Dresses
                </Link>
              </li>
              <li>
                <Link
                  href="/category/bottoms"
                  className="text-cream/80 hover:text-white transition-colors"
                >
                  Bottoms
                </Link>
              </li>
              <li>
                <Link
                  href="/category/accessories"
                  className="text-cream/80 hover:text-white transition-colors"
                >
                  Accessories
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="col-span-1">
            <h3 className="font-display text-lg font-semibold mb-4 uppercase tracking-wider">
              Contact Info
            </h3>
            <ul className="space-y-3 text-cream/80">
              <li>Email: support@floralapparel.com</li>
              <li>Phone: +1 (555) 123-4567</li>
              <li>Address: 123 Blossom Avenue, Spring City</li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-cream/20 text-center">
          <p className="text-sm text-cream/70">
            &copy; {currentYear} Floral Apparel. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
