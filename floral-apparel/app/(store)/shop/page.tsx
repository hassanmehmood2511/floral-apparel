import type { Metadata } from 'next';
import ProductFilters from '@/components/product/ProductFilters';
import ProductGrid from '@/components/product/ProductGrid';
import { fetchStorefrontProducts } from '@/lib/storefrontProducts';

export const metadata: Metadata = {
  title: 'Shop',
};

export default async function ShopPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const category = typeof searchParams.category === 'string' ? searchParams.category : undefined;
  const size = typeof searchParams.size === 'string' ? searchParams.size : undefined;

  let products = [];

  try {
    products = await fetchStorefrontProducts({ category, size });
  } catch (error) {
    console.error('Failed to fetch products for shop page:', error);
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <ProductFilters />
      {products.length === 0 && (
        <p className="mb-6 text-center text-charcoal/70 font-body">No products yet.</p>
      )}
      <ProductGrid products={products} isLoading={false} />
    </div>
  );
}
