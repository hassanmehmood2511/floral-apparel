'use client';

/**
 * Purpose: Slide-out cart drawer component
 * Author: [Author Placeholder]
 * Date: [Date Placeholder]
 */
import React, { useEffect } from 'react';
import Link from 'next/link';
import { useCartContext } from '@/lib/CartContext';
import CartItem from './CartItem';
import { formatPrice } from '@/lib/utils';

export default function CartDrawer() {
  const { isCartOpen, closeCart, items, total } = useCartContext();

  // Prevent background scroll when open
  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isCartOpen]);

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-[60] bg-charcoal/50 backdrop-blur-sm transition-opacity duration-300 ${
          isCartOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={closeCart}
      />

      {/* Drawer */}
      <div
        className={`fixed inset-y-0 right-0 z-[70] w-full max-w-md bg-cream shadow-2xl transition-transform duration-300 ease-in-out transform flex flex-col ${
          isCartOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-pistachio">
          <h2 className="font-display text-2xl font-bold text-charcoal">Your Cart</h2>
          <button
            onClick={closeCart}
            className="p-2 text-charcoal hover:text-blush transition-colors"
            aria-label="Close cart"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 hide-scrollbar">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
              <span className="text-6xl">🌸</span>
              <p className="font-display text-xl font-semibold text-charcoal">Your cart is empty</p>
              <button
                onClick={closeCart}
                className="mt-4 px-6 py-3 bg-white border border-pistachio hover:border-blush text-charcoal rounded-full font-bold transition-colors shadow-sm"
              >
                Shop Now
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {items.map((item) => (
                <CartItem key={`${item.productId}-${item.size}`} item={item} />
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-pistachio p-6 bg-white/50">
            <div className="flex justify-between items-center mb-6">
              <span className="font-body text-lg font-bold text-charcoal">Subtotal</span>
              <span className="font-display text-xl font-bold text-charcoal">
                {formatPrice(total)}
              </span>
            </div>
            <Link
              href="/checkout"
              onClick={closeCart}
              className="w-full bg-blush hover:bg-blush-dark text-white text-lg font-bold py-4 rounded-full shadow-md hover:shadow-lg transition-all flex justify-center items-center"
            >
              Proceed to Checkout
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
