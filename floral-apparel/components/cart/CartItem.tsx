'use client';

/**
 * Purpose: Individual item representation within the cart drawer
 * Author: [Author Placeholder]
 * Date: [Date Placeholder]
 */
import React from 'react';
import Image from 'next/image';
import { CartItemType } from '@/hooks/useCart';
import { useCartContext } from '@/lib/CartContext';
import { formatPrice } from '@/lib/utils';

export default function CartItem({ item }: { item: CartItemType }) {
  const { updateQuantity, removeItem } = useCartContext();

  return (
    <div className="flex gap-4 group bg-white p-3 rounded-2xl border border-pistachio/50 hover:border-pistachio transition-colors">
      <div className="relative w-20 h-24 flex-shrink-0 bg-cream rounded-xl overflow-hidden border border-pistachio/30">
        <Image
          src={item.image || 'https://via.placeholder.com/150'}
          alt={item.name}
          fill
          loading="lazy"
          className="object-cover"
        />
      </div>

      <div className="flex flex-col justify-between flex-1 py-1">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-display font-bold text-charcoal line-clamp-1 pr-2">{item.name}</h3>
            <span className="text-xs font-bold px-2 py-0.5 rounded bg-pistachio-light text-pistachio-dark uppercase tracking-wider inline-block mt-1">
              Size: {item.size}
            </span>
          </div>
          <button
            onClick={() => removeItem(item.productId, item.size)}
            className="text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity p-1 -mr-1"
            aria-label="Remove item"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </button>
        </div>

        <div className="flex justify-between items-end mt-2">
          <div className="flex items-center bg-cream border border-pistachio rounded-lg overflow-hidden h-8">
            <button
              onClick={() => updateQuantity(item.productId, item.size, item.quantity - 1)}
              className="w-8 h-full flex items-center justify-center text-charcoal hover:bg-pistachio-light hover:text-blush transition-colors"
            >
              −
            </button>
            <div className="flex-1 min-w-[32px] text-center font-bold text-sm text-charcoal border-x border-pistachio/50 flex items-center justify-center">
              {item.quantity}
            </div>
            <button
              onClick={() => updateQuantity(item.productId, item.size, item.quantity + 1)}
              className="w-8 h-full flex items-center justify-center text-charcoal hover:bg-pistachio-light hover:text-blush transition-colors"
            >
              +
            </button>
          </div>
          <div className="font-body font-bold text-charcoal">
            {formatPrice(item.price * item.quantity)}
          </div>
        </div>
      </div>
    </div>
  );
}
