'use client';

/**
 * Purpose: Client-side product filter controls
 * Author: [Author Placeholder]
 * Date: [Date Placeholder]
 */
import React from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

export default function ProductFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentCategory = searchParams.get('category') || 'All';
  const currentSize = searchParams.get('size') || '';

  const categories = ['All', 'Tops', 'Bottoms', 'Dresses', 'Outerwear', 'Accessories'];
  const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

  const hasFilters = currentCategory !== 'All' || currentSize !== '';

  const handleCategory = (category: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (category === 'All') {
      params.delete('category');
    } else {
      params.set('category', category.toLowerCase());
    }
    params.delete('page');
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const handleSize = (size: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (currentSize === size) {
      params.delete('size'); // toggle off
    } else {
      params.set('size', size);
    }
    params.delete('page');
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const clearFilters = () => {
    router.push(pathname, { scroll: false });
  };

  return (
    <div className="w-full bg-white border border-pistachio rounded-2xl p-6 shadow-sm mb-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
        <h2 className="font-display text-2xl font-bold text-charcoal">Filter & Sort</h2>
        {hasFilters && (
          <button
            onClick={clearFilters}
            className="text-blush hover:text-blush-dark font-semibold text-sm underline underline-offset-2 transition-colors self-start sm:self-auto"
          >
            Clear Filters
          </button>
        )}
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Categories */}
        <div className="flex-1 overflow-hidden">
          <h3 className="font-body text-sm font-bold text-charcoal/50 uppercase tracking-widest mb-3">
            Category
          </h3>
          <div className="flex overflow-x-auto pb-2 -mx-2 px-2 sm:mx-0 sm:px-0 sm:flex-wrap gap-2 hide-scrollbar">
            {categories.map((cat) => {
              const isSelected =
                (cat === 'All' && currentCategory === 'All') ||
                currentCategory.toLowerCase() === cat.toLowerCase();

              return (
                <button
                  key={cat}
                  onClick={() => handleCategory(cat)}
                  className={cn(
                    'whitespace-nowrap px-4 py-2 rounded-full border text-sm font-semibold transition-all duration-200',
                    isSelected
                      ? 'bg-blush border-blush text-white shadow-md'
                      : 'bg-white border-pistachio text-charcoal hover:border-blush hover:text-blush',
                  )}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Sizes */}
        <div className="flex-1 overflow-hidden">
          <h3 className="font-body text-sm font-bold text-charcoal/50 uppercase tracking-widest mb-3">
            Size
          </h3>
          <div className="flex overflow-x-auto pb-2 -mx-2 px-2 sm:mx-0 sm:px-0 sm:flex-wrap gap-2 hide-scrollbar">
            {sizes.map((size) => {
              const isSelected = currentSize === size;

              return (
                <button
                  key={size}
                  onClick={() => handleSize(size)}
                  className={cn(
                    'min-w-[40px] px-3 py-2 rounded-xl border text-sm font-bold transition-all duration-200 flex items-center justify-center',
                    isSelected
                      ? 'bg-blush border-blush text-white shadow-md'
                      : 'bg-cream border-pistachio text-charcoal hover:border-blush hover:text-blush',
                  )}
                >
                  {size}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
