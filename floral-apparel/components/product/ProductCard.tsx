/**
 * Purpose: Individual product card component
 * Author: [Author Placeholder]
 * Date: [Date Placeholder]
 */
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { formatPrice } from '@/lib/utils';

export default function ProductCard({ product }: { product: any }) {
  // Use first image or a placeholder
  const imageUrl =
    product.images?.[0] ||
    'https://placehold.co/600x800/C8D8A8/2C2C2C?text=Floral+Apparel';
  const productHref = `/products/${product.slug}`;

  return (
    <div className="group relative bg-white border border-pistachio rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 flex flex-col h-full">
      <Link
        href={productHref}
        className="block relative aspect-[4/5] w-full overflow-hidden bg-cream"
      >
        <Image
          src={imageUrl}
          alt={product.name}
          fill
          loading="lazy"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Hover Add to Cart Overlay */}
        <div className="absolute inset-x-0 bottom-0 p-4 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 flex justify-center">
          <button
            onClick={(e) => {
              e.preventDefault(); // Prevent navigating to product page
              // Trigger add to cart context later
            }}
            className="w-full bg-blush hover:bg-blush-dark text-white font-semibold py-3 px-4 rounded-full shadow-lg transition-colors"
          >
            Add to Cart
          </button>
        </div>
      </Link>

      <div className="p-5 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2 gap-2">
          <Link href={productHref}>
            <h3 className="font-display text-lg font-bold text-charcoal line-clamp-1 hover:text-blush transition-colors">
              {product.name}
            </h3>
          </Link>
          <span className="font-body font-bold text-charcoal whitespace-nowrap">
            {formatPrice(product.price)}
          </span>
        </div>

        <p className="font-body text-sm text-charcoal/60 line-clamp-2 mb-4 flex-grow">
          {product.description}
        </p>

        <div className="flex flex-wrap gap-1.5 mt-auto">
          {product.category && (
            <span className="text-[10px] font-bold px-2 py-1 rounded-md bg-cream text-charcoal uppercase tracking-wider border border-pistachio">
              {product.category}
            </span>
          )}
          {product.sizes?.map((size: string) => (
            <span
              key={size}
              className="text-[10px] font-bold px-2 py-1 rounded-md bg-pistachio-light text-pistachio-dark uppercase tracking-wider"
            >
              {size}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
