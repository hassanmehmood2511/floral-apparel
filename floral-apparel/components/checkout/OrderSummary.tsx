'use client';

/**
 * Purpose: Order summary sidebar for the checkout page
 * Author: [Author Placeholder]
 * Date: [Date Placeholder]
 */
import React from 'react';
import Image from 'next/image';
import { useCartContext } from '@/lib/CartContext';
import { formatPrice } from '@/lib/utils';

export default function OrderSummary() {
  const { items, total } = useCartContext();
  const shippingFee = 200;
  const finalTotal = total + shippingFee;

  return (
    <div className="bg-cream border border-pistachio rounded-2xl p-6 shadow-sm sticky top-28">
      <h2 className="font-display text-2xl font-bold text-charcoal mb-6">Order Summary</h2>

      {items.length === 0 ? (
        <p className="text-charcoal/60 font-body">Your cart is empty.</p>
      ) : (
        <div className="space-y-4 mb-6 max-h-[40vh] overflow-y-auto pr-2 hide-scrollbar">
          {items.map((item) => (
            <div key={`${item.productId}-${item.size}`} className="flex gap-4 items-center">
              <div className="relative w-16 h-20 bg-white rounded-lg border border-pistachio overflow-hidden flex-shrink-0">
                <Image
                  src={item.image || 'https://via.placeholder.com/150'}
                  alt={item.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-body font-bold text-charcoal text-sm truncate">{item.name}</h3>
                <p className="text-xs text-charcoal/60 mt-0.5">
                  Size: {item.size} • Qty: {item.quantity}
                </p>
              </div>
              <div className="font-body font-bold text-sm text-charcoal whitespace-nowrap">
                {formatPrice(item.price * item.quantity)}
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="border-t border-pistachio pt-4 space-y-3 font-body text-sm text-charcoal/80">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span className="font-bold text-charcoal">{formatPrice(total)}</span>
        </div>
        <div className="flex justify-between">
          <span>Shipping Fee</span>
          <span className="font-bold text-charcoal">{formatPrice(shippingFee)}</span>
        </div>
      </div>

      <div className="border-t border-pistachio mt-4 pt-4 flex justify-between items-center">
        <span className="font-display font-bold text-lg text-charcoal">Total</span>
        <span className="font-display font-bold text-2xl text-charcoal">
          {formatPrice(finalTotal)}
        </span>
      </div>
    </div>
  );
}
