/**
 * Purpose: Responsive grid layout for displaying multiple product cards
 * Author: [Author Placeholder]
 * Date: [Date Placeholder]
 */
import React from 'react';
import ProductCard from './ProductCard';

export default function ProductGrid({
  products,
  isLoading,
}: {
  products: any[];
  isLoading?: boolean;
}) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="animate-pulse bg-white border border-pistachio rounded-2xl overflow-hidden shadow-sm h-[450px] flex flex-col"
          >
            <div className="bg-pistachio-light/40 h-2/3 w-full"></div>
            <div className="p-5 flex flex-col gap-4">
              <div className="h-6 bg-pistachio-light/60 rounded w-3/4"></div>
              <div className="h-4 bg-pistachio-light/60 rounded w-full"></div>
              <div className="h-4 bg-pistachio-light/60 rounded w-1/2"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <div className="w-full flex flex-col items-center justify-center py-24 text-center px-4 bg-white border border-pistachio border-dashed rounded-2xl shadow-sm">
        <span className="text-6xl mb-6">🌸</span>
        <h3 className="font-display text-2xl font-bold text-charcoal mb-2">No products yet</h3>
        <p className="font-body text-charcoal/60 max-w-md">
          We could not find any items matching your selected filters. Try adjusting category or size.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
      {products.map((product) => (
        <ProductCard key={product._id || product.slug} product={product} />
      ))}
    </div>
  );
}
