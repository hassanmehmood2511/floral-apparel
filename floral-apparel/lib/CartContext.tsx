'use client';

/**
 * Purpose: Context provider for global cart state
 * Author: [Author Placeholder]
 * Date: [Date Placeholder]
 */
import React, { createContext, useContext, ReactNode } from 'react';
import { useCart, CartState } from '@/hooks/useCart';

const CartContext = createContext<CartState | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const cartState = useCart();
  return <CartContext.Provider value={cartState}>{children}</CartContext.Provider>;
}

export function useCartContext() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCartContext must be used within a CartProvider');
  }
  return context;
}
