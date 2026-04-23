/**
 * Purpose: Single product details page
 * Author: [Author Placeholder]
 * Date: [Date Placeholder]
 */
import React from 'react';
import { notFound } from 'next/navigation';
import ProductGallery from '@/components/product/ProductGallery';
import ProductActions from '@/components/product/ProductActions';
import ProductAccordion from '@/components/ui/Accordion';
import ProductGrid from '@/components/product/ProductGrid';
import { formatPrice } from '@/lib/utils';
import { Metadata } from 'next';

// Fallback to localhost if NEXT_PUBLIC_SITE_URL is not set
const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

async function getProduct(slug: string) {
  try {
    const res = await fetch(`${baseUrl}/api/products/${slug}`, {
      cache: 'no-store',
    });
    if (!res.ok) {
      if (res.status === 404) return null;
      throw new Error('Failed to fetch product');
    }
    return await res.json();
  } catch (error) {
    console.error(error);
    return null;
  }
}

async function getRelatedProducts(category: string, currentSlug: string) {
  try {
    const res = await fetch(`${baseUrl}/api/products?category=${category}&limit=5`, {
      cache: 'no-store',
    });
    if (!res.ok) return [];
    const data = await res.json();
    // Filter out the current product and return exactly 4
    return data.products.filter((p: any) => p.slug !== currentSlug).slice(0, 4);
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const product = await getProduct(params.slug);
  if (!product) return { title: 'Product Not Found | Floral Apparel' };

  return {
    title: `${product.name} | Floral Apparel`,
    description: product.description,
  };
}

export default async function ProductPage({ params }: { params: { slug: string } }) {
  const product = await getProduct(params.slug);

  if (!product) {
    notFound();
  }

  const relatedProducts = await getRelatedProducts(product.category, product.slug);

  return (
    <div className="w-full pt-10 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumbs */}
        <nav className="flex text-sm text-charcoal/50 mb-8 font-body">
          <a href="/" className="hover:text-blush transition-colors">
            Home
          </a>
          <span className="mx-2">/</span>
          <a
            href={`/?category=${product.category}`}
            className="hover:text-blush transition-colors capitalize"
          >
            {product.category}
          </a>
          <span className="mx-2">/</span>
          <span className="text-charcoal font-semibold truncate">{product.name}</span>
        </nav>

        {/* Top Section: Gallery & Details */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
          {/* Left Column: Image Gallery */}
          <div className="w-full lg:w-1/2">
            <ProductGallery images={product.images || []} name={product.name} />
          </div>

          {/* Right Column: Product Info */}
          <div className="w-full lg:w-1/2 flex flex-col pt-2 lg:pt-6">
            <div className="mb-6">
              <span className="inline-block px-3 py-1 bg-pistachio-light text-pistachio-dark text-xs font-bold uppercase tracking-widest rounded-full mb-4">
                {product.category}
              </span>
              <h1 className="font-display text-4xl sm:text-5xl font-extrabold text-charcoal leading-tight mb-4">
                {product.name}
              </h1>
              <p className="font-body text-2xl font-bold text-charcoal">
                {formatPrice(product.price)}
              </p>
            </div>

            <p className="font-body text-charcoal/70 text-lg leading-relaxed mb-10">
              {product.description}
            </p>

            <ProductActions product={product} />

            <ProductAccordion />
          </div>
        </div>

        {/* Below the Fold: Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-32">
            <h2 className="font-display text-3xl font-bold text-charcoal text-center mb-12">
              You Might Also Like
            </h2>
            <ProductGrid products={relatedProducts} />
          </div>
        )}
      </div>
    </div>
  );
}
