/**
 * Purpose: Order confirmation and success page
 * Author: [Author Placeholder]
 * Date: [Date Placeholder]
 */
import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { formatPrice } from '@/lib/utils';
import { Metadata } from 'next';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

async function getOrder(orderNumber: string) {
  try {
    const res = await fetch(`${baseUrl}/api/orders/${orderNumber}`, {
      cache: 'no-store',
    });
    if (!res.ok) {
      if (res.status === 404) return null;
      throw new Error('Failed to fetch order');
    }
    return await res.json();
  } catch (error) {
    console.error('Error fetching order for confirmation:', error);
    return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: { orderNumber: string };
}): Promise<Metadata> {
  return {
    title: `Order ${params.orderNumber} Confirmed | Floral Apparel`,
  };
}

export default async function OrderConfirmationPage({
  params,
}: {
  params: { orderNumber: string };
}) {
  const order = await getOrder(params.orderNumber);

  if (!order) {
    notFound();
  }

  const isBankTransfer = order.paymentMethod === 'bank_transfer';
  const waMessage = encodeURIComponent(
    `Hi Floral Apparel! I would like to track my order ${order.orderNumber}.`,
  );
  const waLink = `https://wa.me/923000000000?text=${waMessage}`;

  return (
    <div className="w-full min-h-[80vh] bg-cream py-16 flex items-center justify-center">
      <div className="max-w-3xl w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl shadow-xl p-8 sm:p-12 border border-pistachio relative overflow-hidden">
          {/* Success Checkmark Animation */}
          <div className="flex justify-center mb-8">
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center animate-scale-in">
              <svg
                className="w-12 h-12 text-green-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={3}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
          </div>

          <div className="text-center mb-10">
            <h1 className="font-display text-4xl sm:text-5xl font-extrabold text-charcoal mb-4">
              Order Placed Successfully! <span className="inline-block animate-float">🌸</span>
            </h1>
            <p className="font-body text-charcoal/70 text-lg">
              Thank you for your purchase. Your order number is:
            </p>
            <p className="font-display text-3xl font-bold text-blush-dark mt-2">
              {order.orderNumber}
            </p>
          </div>

          <div className="bg-cream/50 rounded-2xl p-6 sm:p-8 border border-pistachio mb-8">
            <h2 className="font-display text-2xl font-bold text-charcoal mb-6 border-b border-pistachio pb-3">
              Order Summary
            </h2>

            <div className="space-y-4 mb-6">
              {order.items.map((item: any, idx: number) => (
                <div
                  key={idx}
                  className="flex justify-between items-center border-b border-pistachio/30 pb-4 last:border-0 last:pb-0"
                >
                  <div>
                    <p className="font-body font-bold text-charcoal">{item.productName}</p>
                    <p className="text-sm text-charcoal/60">
                      Size: {item.size} • Qty: {item.quantity}
                    </p>
                  </div>
                  <p className="font-bold text-charcoal">
                    {formatPrice(item.priceAtPurchase * item.quantity)}
                  </p>
                </div>
              ))}
            </div>

            <div className="border-t border-pistachio pt-4 space-y-2">
              <div className="flex justify-between text-charcoal/80">
                <span>Subtotal</span>
                <span>{formatPrice(order.subtotal)}</span>
              </div>
              <div className="flex justify-between text-charcoal/80">
                <span>Shipping Fee</span>
                <span>{formatPrice(order.shippingFee)}</span>
              </div>
              <div className="flex justify-between text-charcoal font-bold text-lg pt-2 mt-2 border-t border-pistachio/50">
                <span>Total</span>
                <span className="text-blush-dark">{formatPrice(order.total)}</span>
              </div>
            </div>
          </div>

          {isBankTransfer && (
            <div className="bg-blush-light/30 border border-blush rounded-2xl p-6 mb-8 text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start gap-3 mb-3">
                <span className="text-2xl">🏦</span>
                <h3 className="font-display text-xl font-bold text-charcoal">
                  Bank Transfer Reminder
                </h3>
              </div>
              <p className="text-sm text-charcoal/80 font-body mb-3">
                Please ensure you transfer the total amount of{' '}
                <strong className="text-blush-dark">{formatPrice(order.total)}</strong> to process
                your order.
              </p>
              <div className="bg-white p-4 rounded-xl text-sm font-body border border-blush/30 inline-block text-left">
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
            </div>
          )}

          <div className="text-center mb-10">
            <p className="font-body text-charcoal/80 bg-pistachio-light/40 inline-block px-6 py-3 rounded-full border border-pistachio">
              📦 Expected delivery: <span className="font-bold">5-7 business days</span>
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/"
              className="w-full sm:w-auto px-8 py-4 bg-transparent border-2 border-pistachio hover:border-pistachio-dark hover:bg-pistachio-light text-charcoal font-bold rounded-full shadow-sm hover:shadow-md transition-all text-center"
            >
              Continue Shopping
            </Link>
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-4 bg-green-500 hover:bg-green-600 text-white font-bold rounded-full shadow-md hover:shadow-lg transition-all text-center flex justify-center items-center gap-2"
            >
              <span>Track via WhatsApp</span>
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
