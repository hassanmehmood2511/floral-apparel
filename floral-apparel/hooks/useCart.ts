/**
 * Purpose: Core hook logic for shopping cart state
 * Author: [Author Placeholder]
 * Date: [Date Placeholder]
 */
import { useState, useEffect } from 'react';

export interface CartItemType {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  size: string;
  image?: string;
}

export interface CartState {
  items: CartItemType[];
  count: number;
  total: number;
  isCartOpen: boolean;
  addItem: (item: CartItemType) => void;
  removeItem: (productId: string, size: string) => void;
  updateQuantity: (productId: string, size: string, quantity: number) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
}

export function useCart(): CartState {
  const [items, setItems] = useState<CartItemType[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    const storedCart = localStorage.getItem('floral_cart');
    if (storedCart) {
      try {
        setItems(JSON.parse(storedCart));
      } catch (e) {
        console.error('Failed to parse cart');
      }
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('floral_cart', JSON.stringify(items));
    }
  }, [items, isLoaded]);

  const addItem = (newItem: CartItemType) => {
    setItems((prevItems) => {
      const existingItemIndex = prevItems.findIndex(
        (item) => item.productId === newItem.productId && item.size === newItem.size,
      );

      if (existingItemIndex >= 0) {
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex].quantity += newItem.quantity;
        return updatedItems;
      }

      return [...prevItems, newItem];
    });
    openCart(); // Auto-open cart when adding an item
  };

  const removeItem = (productId: string, size: string) => {
    setItems((prev) =>
      prev.filter((item) => !(item.productId === productId && item.size === size)),
    );
  };

  const updateQuantity = (productId: string, size: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(productId, size);
      return;
    }
    setItems((prev) => {
      const updated = [...prev];
      const index = updated.findIndex((item) => item.productId === productId && item.size === size);
      if (index >= 0) updated[index].quantity = quantity;
      return updated;
    });
  };

  const clearCart = () => setItems([]);
  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  const count = items.reduce((total, item) => total + item.quantity, 0);
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return {
    items,
    count,
    total,
    isCartOpen,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    openCart,
    closeCart,
  };
}
