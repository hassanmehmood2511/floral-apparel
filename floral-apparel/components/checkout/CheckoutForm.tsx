'use client';

/**
 * Purpose: Interactive checkout form for customer details and payment
 * Author: [Author Placeholder]
 * Date: [Date Placeholder]
 */
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCartContext } from '@/lib/CartContext';
import { cn } from '@/lib/utils';

export default function CheckoutForm() {
  const router = useRouter();
  const { items, clearCart } = useCartContext();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    shippingAddress: {
      street: '',
      city: '',
      province: 'Sindh',
      postalCode: '',
    },
    paymentMethod: 'cash_on_delivery',
    paymentProof: '',
  });

  const provinces = [
    'Sindh',
    'Punjab',
    'KPK',
    'Balochistan',
    'Islamabad',
    'Gilgit-Baltistan',
    'AJK',
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name.startsWith('address.')) {
      const field = name.split('.')[1];
      setFormData((prev) => ({
        ...prev,
        shippingAddress: { ...prev.shippingAddress, [field]: value },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handlePaymentMethod = (method: string) => {
    setFormData((prev) => ({ ...prev, paymentMethod: method }));
  };

  const validateForm = () => {
    if (!formData.customerName) return 'Full name is required';
    if (!formData.customerEmail || !/^\S+@\S+\.\S+$/.test(formData.customerEmail))
      return 'Valid email is required';
    if (!formData.customerPhone) return 'Phone number is required';
    if (!formData.shippingAddress.street) return 'Street address is required';
    if (!formData.shippingAddress.city) return 'City is required';
    if (!formData.shippingAddress.postalCode) return 'Postal code is required';
    if (items.length === 0) return 'Your cart is empty';
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setIsLoading(true);

    const orderItems = items.map((item) => ({
      productId: item.productId,
      productName: item.name,
      size: item.size,
      quantity: item.quantity,
      priceAtPurchase: item.price,
    }));

    const payload = {
      ...formData,
      items: orderItems,
    };

    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to place order');
      }

      clearCart();
      router.push(`/order-confirmation/${data.orderNumber}`);
    } catch (err: any) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="bg-cream/50 p-8 rounded-2xl text-center border border-pistachio">
        <p className="font-display text-xl text-charcoal">Your cart is empty.</p>
        <button
          onClick={() => router.push('/shop')}
          className="mt-4 text-blush font-bold underline"
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-10">
      {error && (
        <div className="bg-red-50 text-red-600 border border-red-200 p-4 rounded-xl text-sm font-semibold">
          {error}
        </div>
      )}

      {/* Section 1: Customer Information */}
      <section>
        <h2 className="font-display text-2xl font-bold text-charcoal mb-6 border-b border-pistachio pb-2">
          1. Customer Information
        </h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-bold text-charcoal/70 mb-1">Full Name *</label>
            <input
              type="text"
              name="customerName"
              value={formData.customerName}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-pistachio bg-white focus:outline-none focus:ring-2 focus:ring-blush focus:border-transparent transition-all"
              placeholder="Enter your full name"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-charcoal/70 mb-1">
                Email Address *
              </label>
              <input
                type="email"
                name="customerEmail"
                value={formData.customerEmail}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-pistachio bg-white focus:outline-none focus:ring-2 focus:ring-blush focus:border-transparent transition-all"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-charcoal/70 mb-1">
                Phone Number *
              </label>
              <input
                type="tel"
                name="customerPhone"
                value={formData.customerPhone}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-pistachio bg-white focus:outline-none focus:ring-2 focus:ring-blush focus:border-transparent transition-all"
                placeholder="e.g. 0300 1234567"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Shipping Address */}
      <section>
        <h2 className="font-display text-2xl font-bold text-charcoal mb-6 border-b border-pistachio pb-2">
          2. Shipping Address
        </h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-bold text-charcoal/70 mb-1">
              Street Address *
            </label>
            <input
              type="text"
              name="address.street"
              value={formData.shippingAddress.street}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-pistachio bg-white focus:outline-none focus:ring-2 focus:ring-blush focus:border-transparent transition-all"
              placeholder="House #, Street #, Sector/Block"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-charcoal/70 mb-1">City *</label>
              <input
                type="text"
                name="address.city"
                value={formData.shippingAddress.city}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-pistachio bg-white focus:outline-none focus:ring-2 focus:ring-blush focus:border-transparent transition-all"
                placeholder="e.g. Lahore"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-charcoal/70 mb-1">Province *</label>
              <div className="relative">
                <select
                  name="address.province"
                  value={formData.shippingAddress.province}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-pistachio bg-white focus:outline-none focus:ring-2 focus:ring-blush focus:border-transparent transition-all appearance-none"
                >
                  {provinces.map((prov) => (
                    <option key={prov} value={prov}>
                      {prov}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-charcoal">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    ></path>
                  </svg>
                </div>
              </div>
            </div>
          </div>
          <div>
            <label className="block text-sm font-bold text-charcoal/70 mb-1">Postal Code *</label>
            <input
              type="text"
              name="address.postalCode"
              value={formData.shippingAddress.postalCode}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-pistachio bg-white focus:outline-none focus:ring-2 focus:ring-blush focus:border-transparent transition-all"
              placeholder="e.g. 54000"
            />
          </div>
        </div>
      </section>

      {/* Section 3: Payment Method */}
      <section>
        <h2 className="font-display text-2xl font-bold text-charcoal mb-6 border-b border-pistachio pb-2">
          3. Payment Method
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div
            onClick={() => handlePaymentMethod('cash_on_delivery')}
            className={cn(
              'cursor-pointer border-2 rounded-2xl p-5 transition-all',
              formData.paymentMethod === 'cash_on_delivery'
                ? 'border-blush bg-blush-light/10 shadow-md'
                : 'border-pistachio bg-white hover:border-pistachio-dark',
            )}
          >
            <div className="flex items-center gap-3 mb-2">
              <span className="text-2xl">🏠</span>
              <span className="font-display font-bold text-lg text-charcoal">Cash on Delivery</span>
            </div>
            <p className="text-sm text-charcoal/70 font-body">
              Pay when your order arrives securely at your doorstep.
            </p>
          </div>

          <div
            onClick={() => handlePaymentMethod('bank_transfer')}
            className={cn(
              'cursor-pointer border-2 rounded-2xl p-5 transition-all',
              formData.paymentMethod === 'bank_transfer'
                ? 'border-blush bg-blush-light/10 shadow-md'
                : 'border-pistachio bg-white hover:border-pistachio-dark',
            )}
          >
            <div className="flex items-center gap-3 mb-2">
              <span className="text-2xl">🏦</span>
              <span className="font-display font-bold text-lg text-charcoal">Bank Transfer</span>
            </div>
            <p className="text-sm text-charcoal/70 font-body">
              Transfer securely directly to our business account.
            </p>
          </div>
        </div>

        {formData.paymentMethod === 'bank_transfer' && (
          <div className="bg-cream border border-pistachio p-6 rounded-2xl space-y-4 animate-slide-up">
            <h3 className="font-bold text-charcoal mb-2">Bank Details</h3>
            <div className="text-sm text-charcoal/80 space-y-2 bg-white p-4 rounded-xl border border-pistachio-light">
              <p>
                <strong>Bank:</strong> Meezan Bank
              </p>
              <p>
                <strong>Account Title:</strong> Floral Apparel
              </p>
              <p>
                <strong>IBAN:</strong>{' '}
                {process.env.NEXT_PUBLIC_BANK_IBAN || 'PK00MEZN00000000000000'}
              </p>
            </div>

            <div className="mt-4">
              <label className="block text-sm font-bold text-charcoal/70 mb-2">
                Upload Payment Proof (Image only, Max 5MB)
              </label>
              <input
                type="file"
                accept="image/*"
                className="w-full text-sm text-charcoal file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-pistachio-light file:text-pistachio-dark hover:file:bg-pistachio transition-colors cursor-pointer"
              />
              <p className="text-xs text-charcoal/50 mt-2 italic">
                Note: File upload functionality requires a storage bucket integration in production.
              </p>
            </div>
          </div>
        )}
      </section>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-blush hover:bg-blush-dark disabled:bg-blush/50 text-white font-bold py-4 rounded-full shadow-lg hover:shadow-xl transition-all flex justify-center items-center gap-2 text-lg"
      >
        {isLoading ? (
          <>
            <svg
              className="animate-spin h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            Processing...
          </>
        ) : (
          'Place Order'
        )}
      </button>
    </form>
  );
}
