/**
 * Purpose: Checkout page bridging the form and summary components
 * Author: [Author Placeholder]
 * Date: [Date Placeholder]
 */
import React from 'react';
import CheckoutForm from '@/components/checkout/CheckoutForm';
import OrderSummary from '@/components/checkout/OrderSummary';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Secure Checkout | Floral Apparel',
};

export default function CheckoutPage() {
  return (
    <div className="w-full min-h-screen bg-white">
      {/* Header/Title */}
      <div className="bg-pistachio-light/30 border-b border-pistachio py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-display text-4xl font-bold text-charcoal">Checkout</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
          {/* Left Column: Form */}
          <div className="w-full lg:w-[60%]">
            <CheckoutForm />
          </div>

          {/* Right Column: Summary */}
          <div className="w-full lg:w-[40%]">
            <OrderSummary />
          </div>
        </div>
      </div>
    </div>
  );
}
