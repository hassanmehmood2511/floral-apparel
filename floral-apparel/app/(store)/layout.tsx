import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { CartProvider } from '@/lib/CartContext';
import CartDrawer from '@/components/cart/CartDrawer';

export default function StoreLayout({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      <Navbar />
      <CartDrawer />
      <main className="flex-grow">{children}</main>
      <Footer />
    </CartProvider>
  );
}
