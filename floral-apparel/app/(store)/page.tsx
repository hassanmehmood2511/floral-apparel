import React from 'react';
import HeroSection from '@/components/ui/HeroSection';
import ProductFilters from '@/components/product/ProductFilters';
import ProductGrid from '@/components/product/ProductGrid';

/**
 * Purpose: Main homepage for the Floral Apparel store
 * Author: [Author Placeholder]
 * Date: [Date Placeholder]
 */
export default async function HomePage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const category = typeof searchParams.category === 'string' ? searchParams.category : undefined;
  const size = typeof searchParams.size === 'string' ? searchParams.size : undefined;

  const params = new URLSearchParams();
  if (category) params.append('category', category);
  if (size) params.append('size', size);

  // Fallback to localhost if NEXT_PUBLIC_SITE_URL is not set
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  let products = [];

  try {
    const res = await fetch(`${baseUrl}/api/products?${params.toString()}`, {
      cache: 'no-store',
    });
    if (res.ok) {
      const data = await res.json();
      products = data.products || [];
    }
  } catch (error) {
    console.error('Failed to fetch products for homepage:', error);
  }

  return (
    <div className="w-full">
      <HeroSection />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20" id="shop">
        <ProductFilters />

        <ProductGrid products={products} isLoading={false} />
      </div>
    </div>
  );
}
