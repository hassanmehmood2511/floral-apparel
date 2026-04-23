/**
 * Purpose: Shared storefront layout with navigation, cart, and footer.
 * Author: [Author Placeholder]
 * Date: [Date Placeholder]
 */
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { CartProvider } from '@/lib/CartContext';
import CartDrawer from '@/components/cart/CartDrawer';
import { FadeIn } from '@/components/ui/FadeIn';

/**
 * Wraps all store pages with common storefront UI.
 * @param props Layout children.
 * @returns Store layout component.
 */
export default function StoreLayout({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      <Navbar />
      <CartDrawer />
      <main className="flex-grow">
        <FadeIn>{children}</FadeIn>
      </main>
      <Footer />
    </CartProvider>
  );
}
